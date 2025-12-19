import { useAppContext } from "./AppContext"
import { useLocation, useParams } from "react-router-dom"; 
import Filter from "./Filter";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMoon, faSun, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Header({onBurger}) {
    const { searchQuery, setSearchQuery, notes, theme, setTheme } = useAppContext();
    const [showInput, setShowInput] = useState(false);
    
    function toggleTheme() {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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
                noteStatus === 'archived' ? 'Archived' : 'Deleted';

        title = `${statusLabel} note ${statusLabel!=='Deleted' ? 'editing' : '(read-only)'} `;
    }

    const showListUI = thisPage === '/' || thisPage === '/archive' || thisPage === '/trash';

    return (
        <header className="w-full px-2 py-1 flex justify-between items-center gap-4">
            <button
                onClick={onBurger}
                className="md:hidden p-2 rounded-xl border border-(--border-color)"
                aria-label="Open menu"
            >
                ☰
            </button>
        
            <div>
                {showListUI && (
                    <Filter mode={routeToStatus[thisPage]} />
                )}
            </div> 

            <h1 className="text-2xl text-(--headerTitle) font-semibold ">
                {title}
            </h1>

            <div className="flex items-center justify-end gap-2 w-60">
                {showListUI && (
                    <div>
                        {showInput && (
                            <input
                                type="text"
                                autoFocus 
                                maxLength={50}
                                onChange={e => {
                                    const value = e.target.value.slice(0, 50);
                                    setSearchQuery(value);
                                }}
                                onBlur={checkBlur}
                                value={searchQuery}
                                placeholder="Search notes"
                            />
                        )}
                        {!showInput && (
                            <button onClick={() => setShowInput(true)} title="Search notes">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="hover:scale-115 hover:text-amber-500 duration-300 text-(--search) text-xl mt-1"
                                />
                            </button>
                        )}
                    </div>
                )}
                <div className="flex items-center hover:text-amber-500 text-(--search)">
                        <button
                            id="theme-toggle"
                            className="text-xl"
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' 
                                ? <FontAwesomeIcon icon={faSun} title="Switch to light theme" /> 
                                : <FontAwesomeIcon icon={faMoon} title="Switch to dark theme" />
                            }
                        </button>
                </div>
            </div>
        </header>
    );
}
