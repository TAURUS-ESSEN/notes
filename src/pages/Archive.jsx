import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function Archive() {
    const {notes, setNotes, setToasts} = useAppContext();
    const sortedNotes = useSortedNotes('archived');
    
    function updateNoteStatus(id, nextStatus) {
        const changedNote = notes.find(n=>n.id === id);
        if (!changedNote) return;
        
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? 
                { ...n, status: nextStatus, deletedAt: nextStatus === 'deleted' ? Date.now() : '', }
                : n )
        );

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className={nextStatus === 'active' ? 'activeToast' : 'trashToast'}>
                <strong>{nextStatus==='active' ? 'Active' : 'Deleted'}: </strong>{shorten(changedNote.title)}
                <button className='undoBtn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undo(changedNote.id, toastId)
                    
                    }}>Undo ↻</button>
            </div>
            ) 
        }]))
    }

    function undo(noteId, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => prev.map(n => n.id === noteId ? {...n, status: 'archived', deletedAt: ''} : n))
    }

    function shorten(str, n = 25) {
        return str.length > n ? str.slice(0, n) + '...' : str;
    }

    return (
        <div className="h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-4  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                
                    <div key={note.id} className='notePreviewContainer group'>                        
                        <button   
                            className='toTrashBtn'
                            onClick={()=>{updateNoteStatus(note.id, 'deleted')}}  
                            title='Move to Trash'
                            aria-label="Move to Trash"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                        </button>
                        <button 
                            className='toArchiveBtn'
                            onClick={()=>{updateNoteStatus(note.id, 'active')}} 
                            title='Move to Archive'
                            aria-label="Move to Archive"
                        >
                            <FontAwesomeIcon icon={faLightbulb} className='hover:scale-125 duration-300' /> 
                        </button>

                        <Link to={`/edit/${note.id}`}  title='Click to edit this note'>
                            <div className='notePreview'>
                                <div className='font-semibold'>{note.title} </div>
                                <div> {shorten(note.text, 60)}</div>
                            </div>
                        </Link>
                    </div> 
                )
            )}
            </div>
        </div>
    )
}