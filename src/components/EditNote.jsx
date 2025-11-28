import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

export default function EditNote() {
    const { noteId} = useParams();
    const navigate = useNavigate();
    const {notes, setNotes} = useAppContext();
    const note = notes.find(n=>n.id === Number(noteId))
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text)

    if (!note) {
        return <div className='p-4'>Note not found</div>;
    }

    function onSubmit(e) {
        e.preventDefault()
        setNotes(prev=>prev.map(n => n.id==noteId ? {...n, title: title, text: text}: n));
        setTitle('');
        setText('');
        navigate(-1);
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='max-w-100 flex flex-col gap-4 border p-2 m-auto mt-4'>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} className='border p-2'/>
                <textarea name="" id="" onChange={(e)=>setText(e.target.value)} value={text} className='border p-2'></textarea>
                <div className='flex justify-around'>
                    <button type='button' onClick={()=>navigate(-1)}> Cancel</button>
                    <button type='submit' className='border'>Update</button>
                </div>
            </form>
        </div>
    );
}
