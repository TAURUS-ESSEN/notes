import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";

export default function EditNote() {
    const { noteId} = useParams();
    const navigate = useNavigate();
    const {labels, notes, setNotes} = useAppContext();
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
        setTitle('');
        setText('');
        navigate(-1);
    }

    function toggleLabels(id) {
        setEditLabels(prev => editLabels.includes(id) ? prev.filter(l=>l!==id) : [...prev, id] )
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='max-w-100 flex flex-col gap-4 border p-2 m-auto mt-4'>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} className='border p-2'/>
                <textarea name="" id="" onChange={(e)=>setText(e.target.value)} value={text} className='border p-2'></textarea>
                <div className='flex gap-4'>
                    {labels.map(label => {
                        return  (
                            <span className='flex items-center gap-1'>
                                <input 
                                    type='checkbox'
                                    checked={editLabels.includes(label.id)}
                                    onChange={()=>toggleLabels(label.id)}
                                    className=''
                                />{label.name}

                            </span> )
                    })}
                </div>
                
                <div className='flex justify-around'>
                    <button type='button' onClick={()=>navigate(-1)}> Cancel</button>
                    <button type='submit' className='border'>Update</button>
                </div>
            </form>
        </div>
    );
}
