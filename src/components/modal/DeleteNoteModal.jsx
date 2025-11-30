import Modal from './Modal';
import { useAppContext } from '../AppContext';

export default function AddCategoryModal() {
    const {notes, modal, setNotes, closeModal, setToasts} = useAppContext()

    function onSubmit(e) {
        e.preventDefault()
        const deletedNote = notes.find(n=>n.id === modal.noteId);
        setNotes(prev => prev.filter(n => n.id !== modal.noteId ))  
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