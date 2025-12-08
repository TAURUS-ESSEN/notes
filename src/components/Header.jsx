import { useAppContext } from "./AppContext"
import { useLocation, useParams } from "react-router-dom"; 
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const { searchQuery, setSearchQuery, notes } = useAppContext();
    const [showInput, setShowInput] = useState(false);

    const [theme, setTheme] = useState('');

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => (prev === '' ? 'dark' : ''));
    }

    const location = useLocation();
    const { noteId } = useParams();              
    const thisPage = location.pathname;

    const currentNote = noteId 
        ? notes.find(n => n.id === Number(noteId)) 
        : null;

    const noteStatus = currentNote?.status;      // 'active' | 'archived' | 'deleted'

    const routeToStatus = {
        '/': 'active',
        '/archive': 'archived',
        '/trash': 'deleted'
    };
    const routeToTitle = {
        '/': 'Active Notes',
        '/archive': 'Archive',
        '/trash': 'Trash',
    };

    function checkBlur(e) {
        if (!e.target.value.trim()) {
            setShowInput(false);
        }
    }

    const isEditPage = thisPage.startsWith('/edit/');

    let sectionPath = thisPage;
    if (isEditPage && noteStatus) {
        if (noteStatus === 'active') sectionPath = '/';
        if (noteStatus === 'archived') sectionPath = '/archive';
        if (noteStatus === 'deleted') sectionPath = '/trash';
    }

    let title = routeToTitle[sectionPath] ?? '';
    if (isEditPage && noteStatus) {
        const statusLabel =
            noteStatus === 'active'   ? 'Active'   :
            noteStatus === 'archived' ? 'Archived' :
            'Deleted';

        title = `${statusLabel} note ${statusLabel!=='Deleted' ? 'editing' : '(read-only)'} `;
    }

    const showListUI = thisPage === '/' || thisPage === '/archive' || thisPage === '/trash';

    return (
        <div className="w-full flex justify-between items-center gap-4 p-2">
            <div>
                {showListUI && (
                    <Filter mode={routeToStatus[thisPage]} />
                )}
            </div> 

            <h1 className="text-3xl font-semibold text-[var(--headerTitle)] ">
                {title}
            </h1>

            <div className="flex gap-4 items-center justify-center">
                {showListUI && (
                    <div>
                        {showInput && (
                            <input
                                type="text"
                                autoFocus
                                className="border max-h-10"
                                onChange={(e)=>setSearchQuery(e.target.value)}
                                onBlur={checkBlur}
                                value={searchQuery}
                                placeholder="Search notes"
                            />
                        )}
                        {!showInput && (
                            <button onClick={() => setShowInput(true)} title="Search notes">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="hover:scale-115 hover:text-amber-500 duration-300 text-[var(--search)] text-xl"
                                />
                            </button>
                        )}
                        
                    </div>
                )}
                <div className="flex items-center">
                        <button
                            id="theme-toggle"
                            className="text-xl"
                            onClick={toggleTheme}
                        >
                            {theme === '' ? <FontAwesomeIcon icon={faMoon} className="hover:text-amber-500" />: <FontAwesomeIcon icon={faSun} className="text-[var(--search)] hover:text-amber-500"/>}
                        </button>
                </div>
            </div>
        </div>
    );
}
