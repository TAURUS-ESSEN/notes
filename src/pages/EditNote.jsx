import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';

export default function EditNote() {
    const { noteId} = useParams();
    const navigate = useNavigate();
    const {labels, notes, setNotes, setToasts, openModal} = useAppContext();
    const note = notes.find(n=>n.id === Number(noteId)) ?? '';
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [pin, setPin] = useState(note.pinned);
    const [editLabels, setEditLabels] = useState(note.labels);

    
    if (!note) {
       // return <div className='p-4'>Note not found</div>;
    }
    
    
    const onSubmit = (e) => {
        e.preventDefault()
        setNotes(prev=>prev.map(n => n.id==noteId ? {...n, title: title, text: text, labels: editLabels, pinned:pin, updatedAt: Date.now()}: n));
        setText('');
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
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
            <div className='activeToast'>
                <span> Note {title} was restored</span>
            </div>
        )}])) 
    }

    const acrhive = () => {
        setNotes(prev=>prev.map(n => n.id ==noteId ?  {...n, status: 'archived', pinned: false} : n))
        setPin(false);
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='archiveToast'>
                <span> Note {title} was archived</span>
            </div>
        )}])) 
    }

    const toTrash = () => {
        setNotes(prev=>prev.map(n => n.id ==noteId ?  {...n, status: 'deleted', pinned: false, deletedAt: Date.now()} : n))
        setPin(false);
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast'>
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

    useEffect(()=> {
        const onKey = (e) => {
            if (e.altKey && e.key.toLowerCase() === "s") { onSubmit(e) }
            if ((e.altKey && e.key.toLowerCase() === "a") && (note.status!=='archived'))  { acrhive() }
            if ((e.altKey && e.key.toLowerCase() === "w") && (note.status!=='active'))  { restore() }
            if ((e.altKey && e.key.toLowerCase() === "d") && (note.status!=='deleted'))  { toTrash()}
            if ((e.altKey && e.shiftKey && e.key.toLowerCase() === "d") && (note.status==='deleted'))  { deleteNote(noteId)}
            if (e.key === "Escape")  { navigate(-1) }
        }
        document.addEventListener("keydown", onKey)
        return () => {document.removeEventListener("keydown", onKey)}
    },[note.status, navigate])
    
    return (
        <div className='px-4'> 
            <form onSubmit={onSubmit} className='max-w-3xl m-auto mt-4 p-6 flex flex-col gap-4 border border-(--border-color) rounded-xl bg-(--bg-card) text-(--text-default) shadow-soft '>
                <input 
                    type='text' 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    disabled={note.status === 'deleted'}
                />
                {note.status === 'active' && 
                <div className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faThumbTack} className={`${pin === true ? 'text-(--text-pinned)': 'text-(--text-notpinned)' } text-sm`}/> 
                    <input 
                        type='checkbox' 
                        onChange={(e)=> e.target.checked === true ? setPin(true) : setPin (false)} 
                        checked={pin}
                    /> 
                        Pinned 
                </div>}
                <textarea 
                    onChange={(e)=>setText(e.target.value)} 
                    value={text} 
                    className='leading-relaxed' 
                    rows={12} 
                    disabled={note.status === 'deleted'}>
                </textarea>

                <div className='flex gap-1 text-lg flex-wrap'>
                    <span className='mr-1 text-gray-600'>Labels:</span> 
                    {labels.map(label => (
                        <label
                            key={label.id}
                            className="inline-flex items-center gap-1 px-1 py-0.5 cursor-pointer text-base "
                        >
                            <input
                            type="checkbox"
                            checked={editLabels.includes(label.id)}
                            onChange={() => toggleLabels(label.id)}
                            className="form-checkbox h-4 w-4 align-middle"
                            disabled={note.status === 'deleted'}
                            />
                            <span className="leading-none">
                            {label.name.length > 15 ? label.name.slice(0, 15) + '...' : label.name}
                            </span>
                        </label>
                        ))}
                </div>
                
                <div className='flex justify-around gap-20 mt-6 mb-4'>
                    <button 
                        type='button' 
                        className='btn relative group hover:bg-gray-200 ' 
                        onClick={()=>navigate(-1)} 
                        title="Cancel editing"
                    > 
                        Cancel <span className="hotkey ">(Esc)</span>
                    </button>

                    {(note.status === 'deleted' || note.status === 'archived') &&
                    <button 
                        type='button' 
                        className='btn group hover:bg-green-600 hover:text-white' 
                        onClick={restore} 
                        title="Restore note"
                    > 
                        Restore
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+W)
                        </span>
                    </button>}

                    { note.status !== 'archived' && note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        className='btn hover:bg-amber-300' 
                        onClick={acrhive} 
                        title="Archive note">  
                        Archive <span className="hotkey">(Alt+A)</span>
                    </button>}

                    { note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        onClick={toTrash}
                        className='btn group hover:bg-red-500 hover:text-white' 
                        title="Delete note"
                    >
                        Delete 
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+D)
                        </span>
                    </button>}
                    
                    { note.status === 'deleted' &&
                    <button 
                        type='button' 
                        className='btn group bg-red-600 text-white' 
                        onClick={()=>deleteNote(noteId)} 
                        title="Delete forever"
                    > 
                        <div className="flex flex-col items-center leading-tight">
                            <span className="text-base font-medium">Delete forever</span>
                            <span className="text-xs opacity-70">(Alt+Shift+D)</span>
                        </div>
                    </button>}
                    
                    { note.status !== 'deleted' &&
                        <button 
                            type='submit' 
                            className='btn apply' 
                            title="Save changes (Alt+S)"
                        >
                            Update <span className=" text-xs ml-1 text-white">(Alt+S)</span>
                        </button>}
                </div>
            </form>
        </div>
    );
}
