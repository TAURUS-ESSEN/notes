import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function DeleteNoteModal() {
    const {notes, modal, setNotes, closeModal, setToasts} = useAppContext()
    const currentLocation = useLocation();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault()
        console.log(modal.noteId)

        const deletedNote = notes.find(n=>Number(n.id) === Number(modal.noteId));
        setNotes(prev => prev.filter(n => Number(n.id) !== Number(modal.noteId) ))  
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast'>
                Task <strong>{deletedNote.title}</strong> was deleted <button className='btn' onClick={(e)=>{
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
        return notes.find(n=>n.id === id)?.title.slice(0,15) ?? '';
    }

    return (
        <>
            <Modal title={`Delete this note: ${findNoteName(modal.noteId)}...`} closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col gap-4 p-4' >
                    Do you really want to delete this note?
                    <div className='flex justify-between gap-4'>
                        <button type="button" onClick={closeModal} className='border  p-2'>Cancel</button>
                        <button type='submit' className='border p-2'>
                            Delete
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}