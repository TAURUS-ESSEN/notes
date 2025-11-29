// import styles from './modal.module.css';
import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useState } from 'react';

export default function AddCategoryModal() {
    const {notes, setNotes, closeModal} = useAppContext()
    const [noteTitle, setNoteTitle] = useState('');
    const lenghtOK = noteTitle.length > 1;
    const [noteText, setNoteText] = useState('');


    function onSubmit(e) {
        e.preventDefault()
        setNotes(prev=> [...prev, { id: Date.now() , title: noteTitle, text: noteText, status: 'active', createdAt: Date.now(), updatedAt:'', deletedAt: ''}])
        setNoteTitle('');
        setNoteText('');
        closeModal();
    }

    function cancel() {
        setNoteTitle('');
        setNoteText('');
        closeModal();
    }
    
    return (
        <>
            <Modal title='Create new note' closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col gap-4 p-4' >
                    {/* <label>Enter category name:</label> */}
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
                    <textarea onChange={(e)=>setNoteText(e.target.value)} value={noteText} className='border'></textarea>
                    <div className='flex justify-between gap-4'>
                        <button type="button" onClick={cancel} className='border  p-2'>Cancel</button>
                        <button type='submit' disabled={!lenghtOK} className='border p-2'>
                            +Add New Note
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}