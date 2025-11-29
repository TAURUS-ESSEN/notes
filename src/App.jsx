import { useState, useEffect, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ModalHost from './components/ModalHost'
import { AppContext } from './components/AppContext'
import './App.css';
import { DEFAULT_NOTES } from './data/default';
import { Outlet } from 'react-router-dom'

function loadInitialData(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [notes, setNotes] = useState(()=>loadInitialData('notes', DEFAULT_NOTES));
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null});
  const [sortBy, setSortBy] = useState({active:'new', archived: 'new', deleted: 'new'})

  const openModal = useCallback((modalType, id = null) => {
    setModal({isOpen: true, type: modalType, noteId : id});
  }, []);
  const closeModal = useCallback(() => {
    setModal({isOpen: false, type: null, noteId:null});
  }, []);

  const contextValue = useMemo(() => ({
    notes, setNotes, modal, openModal, closeModal, sortBy, setSortBy }), 
    [notes, modal , openModal, closeModal, sortBy]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]);




  return (
    <AppContext.Provider value={contextValue}>
      <div className='wrapper flex m-auto p-2 bg-amber-50 '>
        <Sidebar/>
        <main className='flex flex-col h-screen w-full bg-blue-50 border-l'>
          <Header/>
          <Outlet />
        </main>
      </div>
      <ModalHost />
    </AppContext.Provider>)
}

export default App
