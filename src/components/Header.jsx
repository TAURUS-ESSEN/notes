import { useAppContext } from "./AppContext"
import { useLocation, useParams } from "react-router-dom"; 
import Filter from "./Filter";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMoon, faSun, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import SearchOverlay from "./SearchOverlay";

export default function Header({onBurger}) {
    const { searchQuery, setSearchQuery, notes, theme, setTheme } = useAppContext();
    const [searchOpen, setSearchOpen] = useState(false);
    
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
            <div className="w-full">
            <h1 className="text-base md:text-2xl text-(--headerTitle) font-semibold ">
                {title}
            </h1></div>

            <div className="flex items-center justify-end gap-2 w-60">
                {showListUI && (
                            <button
                            type="button"
                            onClick={() => setSearchOpen(true)}
                            title="Search notes"
                            >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="hover:scale-115 hover:text-amber-500 duration-300 text-(--search) text-xl mt-1"
                            />
                            </button>
                        )}
                <div className="hidden md:flex items-center hover:text-amber-500 text-(--search)">
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
            <SearchOverlay
        open={searchOpen}
        value={searchQuery}
        onChange={(v) => setSearchQuery(v.slice(0, 50))}
        onClose={() => setSearchOpen(false)}
      />
        </header>
    );
}
