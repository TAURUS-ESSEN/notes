import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTrashCan } from '@fortawesome/free-regular-svg-icons';

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
            <div className='activeToast break-all'>
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
        <div className="h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-4  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                
                    <div key={note.id} className='notePreviewContainer group'>                        
                        <button   
                            className='toTrashBtn'
                            onClick={()=>openModal('deleteNote', note.id)}
                            title='Move to Trash'
                            aria-label="Move to Trash"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                        </button>
                        <button 
                            className='toArchiveBtn'
                            onClick={()=>{restoreNoteFromTrash(note.id)}}
                            title='Move to Notes'
                            aria-label="Move to Notes"
                        >
                            <FontAwesomeIcon icon={faLightbulb} className='hover:scale-125 duration-300' /> 
                        </button>

                        <Link to={`/edit/${note.id}`}  title='Click to edit this note'>
                            <div className='notePreview'>
                                <div className='font-semibold wrap-break-word'>{shorten(note.title, 15)} </div>
                                <div className='wrap-break-word'> {shorten(note.text, 60)}</div>
                            </div>
                        </Link>
            
                    </div> 
                )
            )}
            </div>
        </div>
    )
}