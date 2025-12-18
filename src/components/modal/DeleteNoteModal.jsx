import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useNavigate, useLocation } from "react-router-dom";

export default function DeleteNoteModal() {
    const {notes, modal, setNotes, closeModal, setToasts} = useAppContext()
    const currentLocation = useLocation();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault()

        const deletedNote = notes.find(n=>Number(n.id) === Number(modal.noteId));
        setNotes(prev => prev.filter(n => Number(n.id) !== Number(modal.noteId) ))  
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast'>
                Note <strong>{deletedNote.title}</strong> was deleted <button className='btn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undo(deletedNote, toastId)
                    
                    }}>Undo ↻</button>
            </div>
            ) 
        }]))
        closeModal();
        if (currentLocation.pathname.includes('edit')) navigate(-1);
        
    }

    function undo(deletedNote, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => [...prev, deletedNote]);
    }

    function findNoteName(id) {
        return notes.find(n => n.id === Number(id))?.title.slice(0, 15) ?? '';
    }

    return (
        <>
            <Modal title={`Delete this note: ${findNoteName(modal.noteId)}...`} closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col text-lg rounded-xl' >
                    <div className='flex justify-center items-center text-xl m-auto max-w-80 text-center'> 
                        Do you really want to delete this note?
                    </div>
                    <div className='flex justify-around gap-4 p-4 mt-1'>
                        <button 
                            type="button" 
                            onClick={closeModal} 
                            className='btn border p-2 bg-gray-100 hover:bg-gray-200 duration-300 hover:scale-105 rounded-xl'
                            title="Cancel delete"
                        >
                            Cancel
                        </button>
                        <button 
                            type='submit' 
                            className='btn border p-3 bg-red-400 hover:bg-red-500 duration-300 hover:scale-105 text-white rounded-xl'
                            title="Delete forever"
                        >
                            Delete
                        </button>      
                    </div>

                </form>
            </Modal>
        </>
    )
}