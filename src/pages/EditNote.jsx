import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";

export default function EditNote() {
    const { noteId} = useParams();
    const navigate = useNavigate();
    const {labels, notes, setNotes, setToasts, openModal} = useAppContext();
    const note = notes.find(n=>n.id === Number(noteId)) ?? '';
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text)
    const [editLabels, setEditLabels] = useState(note.labels);

    useEffect(()=> {
        const onKey = (e) => {
            if (e.altKey && e.key.toLowerCase() === "s") { onSubmit(e) }
            if ((e.altKey && e.key.toLowerCase() === "a") && (note.status!=='archived'))  { acrhive() }
            if ((e.altKey && e.key.toLowerCase() === "w") && (note.status!=='active'))  { restore() }
            if ((e.altKey && e.key.toLowerCase() === "d") && (note.status!=='deleted'))  { toTrash()}
            if (e.key === "Escape")  { navigate(-1) }
        }
        document.addEventListener("keydown", onKey)
        return () => {document.removeEventListener("keydown", onKey)}
    },[title, text, editLabels, note.status, navigate])

    if (!note) {
        return <div className='p-4'>Note not found</div>;
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        setNotes(prev=>prev.map(n => n.id==noteId ? {...n, title: title, text: text, labels: editLabels, updatedAt: Date.now()}: n));
        setText('');
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast justify-center text-center'>
                <span> Note {title} was updated</span>
            </div>
        )}])) 
        setTitle('');
        navigate(-1);
    }

    const restore = () => {
        setNotes(prev=>prev.map(n => n.id ==noteId ?  {...n, status: 'active', deletedAt: ''} : n))
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast justify-center text-center'>
                <span> Note {title} was restored</span>
            </div>
        )}])) 
    }

    const acrhive = () => {
        setNotes(prev=>prev.map(n => n.id ==noteId ?  {...n, status: 'archived'} : n))
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='archiveToast justify-center text-center'>
                <span> Note {title} was archived</span>
            </div>
        )}])) 
    }

    const toTrash = () => {
        setNotes(prev=>prev.map(n => n.id ==noteId ?  {...n, status: 'deleted', deletedAt: Date.now()} : n))
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast justify-center text-center'>
                <span> Note {title} was deleted</span>
            </div>
        )}])) 
    }

    const deleteNote = (id) => {
        openModal('deleteNote', Number(id))
    }

    const toggleLabels = (id) => {
        setEditLabels(prev => editLabels.includes(id) ? prev.filter(l=>l!==id) : [...prev, id] )
    }

    return (
        <div className='px-4'> 
            <form onSubmit={onSubmit} className='max-w-3xl m-auto mt-4 p-6 flex flex-col gap-4 border-gray-400 rounded-lg bg-white shadow-soft'>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} className='border border-gray-300 p-2'
                disabled={ note.status == 'deleted' ? 'disabled' : ''}/>
                <textarea name="" id="" onChange={(e)=>setText(e.target.value)} value={text} className='border border-gray-300 p-2 leading-relaxed' rows={12} disabled={ note.status == 'deleted' ? 'disabled' : ''}></textarea>
                <div className='flex gap-3 text-lg flex-wrap'>
                    <span className='mr-1 text-gray-600'>Labels:</span> 
                    {labels.map(label => {
                        return  (
                            <span className='flex items-center gap-1'> 
                                <input 
                                    type='checkbox'
                                    checked={editLabels.includes(label.id)}
                                    onChange={()=>toggleLabels(label.id)}
                                    className='form-checkbox text-blue-600 rounded-lg'
                                    disabled={ note.status == 'deleted' ? 'disabled' : ''}
                                />{ label.name.length > 15 ? label.name.slice(0,15)+'...' : label.name }

                            </span> )
                    })}
                </div>
                
                <div className='flex justify-around gap-20 mt-6 mb-4'>
                    <button type='button' className='btn  hover:bg-gray-200 ' onClick={()=>navigate(-1)} title="Cancel editing"> 
                        Cancel
                    </button>
                    {(note.status === 'deleted' || note.status === 'archived') &&
                    <button type='button' className='btn hover:bg-green-600 hover:text-white' onClick={restore} title="Restore note"> 
                        Restore
                    </button>}
                    { note.status !== 'archived' && note.status !== 'deleted' &&
                    <button type='button' className='btn hover:bg-amber-300' onClick={acrhive} title="Archive note">  
                        Archive
                    </button>}
                    { note.status !== 'deleted' &&
                    <button type='button' className='btn hover:bg-red-500 hover:text-white' onClick={toTrash} title="Delete note"> 
                        Delete
                    </button>}
                    { note.status === 'deleted' &&
                    <button type='button' className='btn bg-red-600 text-white' onClick={()=>deleteNote(noteId)} title="Delete forever"> 
                        Delete forever
                    </button>}
                    { note.status !== 'deleted' &&
                        <button type='submit' className='btn apply' title="Save changes">Update</button>}
                </div>
            </form>
        </div>
    );
}
