import Modal from './Modal';
import { useAppContext } from '../AppContext';

export default function AddCategoryModal() {
    const {notes, modal, setNotes, closeModal} = useAppContext()

    function onSubmit(e) {
        e.preventDefault()
        setNotes(prev => prev.filter(n => n.id !== modal.noteId ))  
        closeModal();
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