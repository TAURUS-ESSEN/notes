import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes'

export default function Trash() {
    const {notes, openModal, setNotes, setToasts} = useAppContext()
    const sortedNotes = useSortedNotes('deleted');

    function restoreNoteFromTrash(id) {
        const changedNote = notes.find(n=>n.id === id);
        if (!changedNote) return;
        
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? 
                { ...n, status: 'active', deletedAt: ''}
                : n )
        );

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <strong>Recovered: </strong>{shorten(changedNote.title)}
                <button className='undoBtn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undoRestore(changedNote.id, changedNote.deletedAt, toastId)
                    
                    }}>Undo ↻</button>
            </div>
            ) 
        }]))
    }

    function undoRestore(noteId, deletedAt, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => prev.map(n => n.id === noteId ? {...n, status: 'deleted', deletedAt, } : n))
    }

    function shorten(str, n = 25) {
        return str.length > n ? str.slice(0, n) + '...' : str;
    }

    return (
        <div className="bg-amber-100 h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-6  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                    <div key={note.id} className='bg-white rounded p-4 max-w-100 relative group'>                        
                        <button 
                            className='absolute top-1 right-1 opacity-0  group-hover:opacity-100  text-black border'
                            onClick={()=>openModal('deleteNote', note.id)}

                        >
                            X 
                        </button>
                        <button 
                            className='absolute top-1 left-1 opacity-0  group-hover:opacity-100  text-black border'
                                // onClick={()=>setNotes(prev => prev.map(n => n.id === note.id ? {...n, status: 'active', deletedAt: ''} : n))} 
                                onClick={()=>{restoreNoteFromTrash(note.id)}}    
                        >
                            R 
                        </button>
                        <Link to={`/edit/${note.id}`}>
                        <div className='flex flex-col'>
                            <div>{note.title} </div>
                            <div>{note.text}</div>
                        </div></Link>
                    </div> 
                )
            )}</div>
            
        </div>
    )
}