import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useState } from 'react';

export default function AddNotesModal() {
    const {labels, setNotes, setToasts, closeModal} = useAppContext()
    const [noteTitle, setNoteTitle] = useState('');
    const [noteLabels, setNoteLabels] = useState([]);
    const isTitleValid = noteTitle.length > 1;
    const [noteText, setNoteText] = useState('');


    const onSubmit = (e) => {
        e.preventDefault()
        setNotes(prev=> [...prev, { id: Date.now() , title: noteTitle, text: noteText, status: 'active', createdAt: Date.now(), updatedAt:'', deletedAt: '', labels: noteLabels}])
        setNoteText('');
        closeModal();

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <strong>Created: </strong>{shorten(noteTitle)}
            </div>
            )}])) 
        setNoteTitle('');
        }

    function shorten(str, n = 25) {
        return str.length > n ? str.slice(0, n) + '...' : str;
    }

    const cancel = () => {
        setNoteTitle('');
        setNoteText('');
        closeModal();
    }
    
    const toggleLabels = (id) => {
        setNoteLabels(prev => prev.includes(id) ? prev.filter(l=>l!==id) : [...prev, id] )
    }


    return (
        <>
            <Modal title='Create new note' closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col gap-4 px-4 md:min-w-100 max-w-160 mb-4' >
                    <input type='text' 
                        onChange={(e) => setNoteTitle(e.target.value.slice(0,35))} 
                        value={noteTitle}
                        // onBlur = {(e) => setCategoryName(e.target.value.trim())} 
                        maxLength={35}
                        autoFocus
                        className='border p-2' 
                        required
                        placeholder='Note Title, min 2 characters'
                    />
                    <textarea onChange={(e)=>setNoteText(e.target.value)} value={noteText} className='border' rows="10"></textarea>
                    <div className='flex gap-2 flex-wrap'>
                        {labels.map(label=> { return (
                            <span key={label.id} className='flex gap-1 items-center '>
                                <input 
                                    type='checkbox' 
                                    checked={noteLabels.includes(label.id)}  
                                    onChange={()=>toggleLabels(label.id)}
                                /> 
                                {label.name}
                            </span>
                        )})}
                    </div>
                    <div className='flex justify-between gap-4'>
                        <button type="button" onClick={cancel} className='btn cancel shadow-soft'>Cancel</button>
                        <button type='submit' disabled={!isTitleValid} className='btn apply shadow-soft'>
                            +Add New Note
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}