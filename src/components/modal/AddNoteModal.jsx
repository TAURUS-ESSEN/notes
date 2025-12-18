import Modal from './Modal';
import { useEditor, EditorContent } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { useAppContext } from '../AppContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import EditorToolbar from "../EditorToolbar";

export default function AddNotesModal() {
    const {labels, setNotes, setToasts, closeModal} = useAppContext()
    const [noteTitle, setNoteTitle] = useState('');
    const [noteLabels, setNoteLabels] = useState([]);
    const [pin, setPin] = useState(false);
    const isTitleValid = noteTitle.length > 1;
    const [noteText, setNoteText] = useState('');
    const [noteContent, setNoteContent] = useState(null);

    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: noteContent,
        onUpdate: ({ editor }) => {
            setNoteContent(editor.getJSON()); // <-- обновляем локальный JSON
            setNoteText(editor.getText());    // <-- опционально: обновляем legacy text (чтобы карточки/поиск не ломать)
        },
    });    

    const onSubmit = (e) => {
        e.preventDefault()
        const html = editor?.getHTML() ?? "";
        const plain = editor?.getText() ?? noteText;
        const json = editor?.getJSON() ?? noteContent;
        setNotes(prev=> [...prev, { id: Date.now() , title: noteTitle, text: plain, content: json, previewHtml: html,  status: 'active', createdAt: Date.now(), updatedAt:'', deletedAt: '', pinned: pin, labels: noteLabels}])
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
        setNoteLabels(prev => prev.includes(id) 
            ? prev.filter(l=>l!==id) 
            : [...prev, id] )
    }

    return (
        <>
            <Modal title='Create new note' closeModal={closeModal}>
                <form onSubmit={onSubmit} className='md:min-w-100 max-w-160 mb-6 px-6 flex flex-col gap-2' >

                    <input type='text' 
                        onChange={(e) => setNoteTitle(e.target.value.slice(0,35))} 
                        value={noteTitle}
                        // onBlur = {(e) => setCategoryName(e.target.value.trim())} 
                        maxLength={35}
                        autoFocus
                        className='p-2 rounded-lg' 
                        required
                        placeholder='Note Title, min 2 characters'
                    />
                    
                    <div className='flex gap-1 items-center'>
                        <FontAwesomeIcon icon={faThumbTack} className={`${pin === true ? 'text-(--text-pinned)': 'text-(--text-notpinned)'  } text-sm`}/> 
                        <input 
                            type='checkbox' 
                            onChange={(e)=> e.target.checked === true ? setPin(true) : setPin (false)} 
                        /> 
                            Pinned 
                    </div>
                    {/* <textarea 
                        onChange={(e)=>setNoteText(e.target.value)} 
                        value={noteText} 
                        className='border rounded-lg text-(--text-edit-input) bg-(--bg-edit-input)' 
                        rows="10"
                    >
                    </textarea> */}
                                    <EditorToolbar editor={editor} />
                                    <div className="border border-(--border-color)   text-left ">
                                        <EditorContent editor={editor} className='min-h-50 text-(--text-edit-input) bg-(--bg-edit-input)'/>
                                    </div>
                    
                    <div className='flex gap-2 flex-wrap mt-2'>
                        {labels.map(label=> { return (
                            <span key={label.id} className='flex gap-1 items-center'>
                                <input 
                                    type='checkbox' 
                                    checked={noteLabels.includes(label.id)}  
                                    onChange={()=>toggleLabels(label.id)}
                                /> 
                                {label.name}
                            </span>
                        )})}
                    </div>

                    <div className='flex justify-between gap-4 mt-6'>
                        <button type="button" onClick={cancel} className='btn '>
                            Cancel
                        </button>
                        <button type='submit' disabled={!isTitleValid} className='btn apply shadow-soft'>
                            +Add New Note
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}