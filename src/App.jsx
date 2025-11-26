import { useState, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Main from './components/Main'
import ModalHost from './components/ModalHost'
import { AppContext } from './components/AppContext'
import './App.css'

function App() {
  const [notes, setNotes] = useState({id: null,  title: '', description: '', labels: []})
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null});

  const openModal = useCallback((modalType, id = null) => {
    setModal({isOpen: true, type: modalType, taskId : id});
  }, []);
  const closeModal = useCallback(() => {
    setModal({isOpen: false, type: null, taskId:null});
  }, []);


  const contextValue = useMemo(() => ({
    notes, setNotes, modal, openModal, closeModal }), 
    [notes, modal , openModal, closeModal]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className='wrapper flex m-auto p-2 bg-amber-50 '>
        <Sidebar/>
        <div className='flex flex-col h-screen w-full bg-blue-50 border-l'>
          <Header/>
          <Main />
        </div>
      </div>
      <ModalHost />
    </AppContext.Provider>)
}

export default App
