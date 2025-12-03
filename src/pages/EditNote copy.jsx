import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";

export default function EditNote() {
    const { noteId} = useParams();
    const navigate = useNavigate();
    const {labels, notes, setNotes, setToasts} = useAppContext();
    const note = notes.find(n=>n.id === Number(noteId))
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text)
    const [editLabels, setEditLabels] = useState(note.labels);

    if (!note) {
        return <div className='p-4'>Note not found</div>;
    }

    function onSubmit(e) {
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

    function toggleLabels(id) {
        setEditLabels(prev => editLabels.includes(id) ? prev.filter(l=>l!==id) : [...prev, id] )
    }

    return (
        <div className='p-4'>
            <form onSubmit={onSubmit} className='max-w-3xl mx-auto flex flex-col gap-4  border-gray-400 rounded-lg p-6 m-auto mt-4 bg-white shadow-soft'>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} className='border border-gray-300 p-2'
                disabled={ note.status == 'deleted' ? 'disabled' : ''}/>
                <textarea name="" id="" onChange={(e)=>setText(e.target.value)} value={text} className='border border-gray-300 p-2 leading-relaxed' rows={12} disabled={ note.status == 'deleted' ? 'disabled' : ''}></textarea>
                <div className='flex gap-4 text-lg '><span className='mr-1 text-gray-600'>Labels:</span> 
                    {labels.map(label => {
                        return  (
                            <span className='flex items-center gap-1 '> 
                                <input 
                                    type='checkbox'
                                    checked={editLabels.includes(label.id)}
                                    onChange={()=>toggleLabels(label.id)}
                                    className='form-checkbox text-blue-600 rounded-lg'
                                />{label.name}

                            </span> )
                    })}
                </div>
                
                <div className='flex justify-around gap-20 mt-6 mb-4'>
                    <button type='button' className='btn cancel ' onClick={()=>navigate(-1)}> 
                        {note.status ==='deleted' ? 'restore' : 'cancel'}</button>
                    <button type='submit' className='btn apply '>{note.status ==='deleted' ? 'restore' : 'Update'}</button>
                </div>
            </form>
        </div>
    );
}
