import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, pointerWithin } from "@dnd-kit/core";

import { useState, useEffect, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ModalHost from './components/modal/ModalHost'
import { AppContext } from './components/AppContext'
import Toasts from './components/Toasts';
import './App.css';
import { DEFAULT_LABELS, DEFAULT_NOTES, DEFAULT_THEME } from './data/default';
import { Outlet, useNavigate } from 'react-router-dom'
import NoteCardPreview from "./components/note/NoteCardPreview";

function loadInitialData(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data !== null ? data : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [notes, setNotes] = useState(()=>loadInitialData('notes', DEFAULT_NOTES));
  const [labels, setLabels] = useState(()=>loadInitialData('labels', DEFAULT_LABELS));
  const [modal, setModal] = useState({isOpen: false, type: null, noteId:null});
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState({active:'new', archived: 'new', deleted: 'lastDeleted'});
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(()=>loadInitialData('theme', DEFAULT_THEME));
  const [activeDrag, setActiveDrag] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSidebarOpen(false);
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
} , []);

  useEffect(() => {
  if (!sidebarOpen) return;

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = prevOverflow;
  };
}, [sidebarOpen]);

  const activeNote = useMemo(
    () => notes.find(n => n.id === activeDrag) ?? null,
    [notes, activeDrag]
  );

  const openModal = useCallback((modalType, id = null) => {
    setModal({isOpen: true, type: modalType, noteId : id});
  }, []);
  const closeModal = useCallback(() => {
    setModal({isOpen: false, type: null, noteId:null});
  }, []);

  const toggleLabelFilter = useCallback((id = null) => {
    setFilter(prev => {
      const hasId = prev.includes(id);
      return hasId
        ? prev.filter(num => num !== id)
        : [...prev, id];
  });
  },[])

  const contextValue = useMemo(() => ({
    notes, setNotes, modal, openModal, closeModal, sortBy, setSortBy, searchQuery, setSearchQuery, labels, setLabels, filter, setFilter, toasts, setToasts, theme, setTheme, toggleLabelFilter }), 
    [notes, modal , openModal, closeModal, sortBy, searchQuery, labels, filter, toasts, theme, toggleLabelFilter]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('labels', JSON.stringify(labels))
  }, [labels]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
    document.body.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  }, [theme]);

  useEffect(()=>{
    const onKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === "n")  {
        e.preventDefault();
        openModal('addNote');
      }

      if (e.altKey && e.key === "1")  {
        navigate('/')
      }

      if (e.altKey && e.key === "2")  {
        navigate('/archive')
      }

      if (e.altKey && e.key === "3")  {
        navigate('/trash')
      }

      if (e.altKey && e.key === "l")  {
        openModal("addLabel")
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {document.removeEventListener("keydown", onKey)}
  },[openModal, navigate])  
  
  const handleDragEnd = useCallback(({ active, over }) => {
    setActiveDrag(null);

    if (!over) return;

    const activeData = active?.data?.current;
    const overData = over?.data?.current;

    if (!activeData || activeData.type !== "note") return;
    if (!overData || !overData.nextStatus) return;

    const noteId = activeData.noteId;
    const nextStatus = overData.nextStatus;

    setNotes(prev =>
      prev.map(n => {
        if (n.id !== noteId) return n;
        if (n.status === nextStatus) return n;

      return {
        ...n,
        status: nextStatus,
        pinned: false,
        deletedAt: nextStatus === "deleted" ? Date.now() : null,
      };
    })
  );
},[setNotes])

    const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                    distance: 5,  
                },
            })
    );

  return (
  <AppContext.Provider value={contextValue}>
    <Toasts toasts={toasts} setToasts={setToasts} />

    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={({ active }) => {
        if (active?.data?.current?.type === "note") {
          setActiveDrag(active.data.current.noteId);
        }
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDrag(null)}
    >
      <div className="appLayout">
  {/* DESKTOP SIDEBAR */}
  <aside className="hidden md:block w-[250px] shrink-0 h-screen sticky top-0 overflow-auto border-r border-(--border-main)">
    <Sidebar />
  </aside>

  {/* MAIN */}
  <main className="mainScroll flex-1">
    <DragOverlay>
      {activeNote ? (
        <div style={{ width: 320, pointerEvents: "none" }}>
          <NoteCardPreview note={activeNote} labels={labels} />
        </div>
      ) : null}
    </DragOverlay>

    <Header onBurger={() => setSidebarOpen(true)} />
    <Outlet />
  </main>

  {/* MOBILE OVERLAY */}
  {sidebarOpen && (
<div
  className={[
    "fixed inset-0 z-40 md:hidden",
    "bg-black/40 backdrop-blur-xs",
    "transition-opacity duration-300",
    sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
  ].join(" ")}
  onClick={() => setSidebarOpen(false)}
/>
  )}

  {/* MOBILE DRAWER */}
  <aside
    className={[
      "fixed top-0 left-0 z-50 h-screen w-[260px] max-w-[85vw]",
      "bg-(--bg-modal) border-r border-(--border-main)",
      "transform transition-transform duration-300 md:hidden",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
    ].join(" ")}
  >
    <div className="h-full overflow-auto p-4">
      <Sidebar onNavigate={() => setSidebarOpen(false)} />
    </div>
  </aside>
</div>

    </DndContext>

    <ModalHost />
  </AppContext.Provider>
);
}

export default App
