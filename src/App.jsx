import { useState, useEffect, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ModalHost from './components/modal/ModalHost'
import { AppContext } from './components/AppContext'
import Toasts from './components/Toasts';
import './App.css';
import { DEFAULT_LABELS, DEFAULT_NOTES, DEFAULT_THEME } from './data/default';
import { Outlet, useNavigate } from 'react-router-dom'
import DnDPlayground from './components/DnDPlayground'

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
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null});
  const [filter, setFilter] = useState([])
  const [sortBy, setSortBy] = useState({active:'new', archived: 'new', deleted: 'lastDeleted'});
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(()=>loadInitialData('theme', DEFAULT_THEME));

  const navigate = useNavigate();

  const openModal = useCallback((modalType, id = null) => {
    setModal({isOpen: true, type: modalType, noteId : id});
  }, []);
  const closeModal = useCallback(() => {
    setModal({isOpen: false, type: null, noteId:null});
  }, []);

  const contextValue = useMemo(() => ({
    notes, setNotes, modal, openModal, closeModal, sortBy, setSortBy, searchQuery, setSearchQuery, labels, setLabels, filter, setFilter, toasts, setToasts, theme, setTheme }), 
    [notes, modal , openModal, closeModal, sortBy, searchQuery, labels, filter, toasts, theme]);

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
        navigate('archive')
      }

      if (e.altKey && e.key === "3")  {
        navigate('trash')
      }

      if (e.altKey && e.key === "l")  {
        openModal("addLabel")
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {document.removeEventListener("keydown", onKey)}
  },[openModal])  

  return (
    <AppContext.Provider value={contextValue}>
      <div className='wrapper '>
        <Toasts toasts={toasts} setToasts={setToasts}/>
        <Sidebar/>
        <main className='flex flex-col h-screen w-full border-l border-(--border-main) '>
          <Header/>
          {/* <DnDPlayground /> */}
          <Outlet />
        </main>
      </div>
      <ModalHost />
    </AppContext.Provider>)
}

export default App
