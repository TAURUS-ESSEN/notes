import {Link} from 'react-router-dom'
import AddNewNote from '../components/modal/AddNewNote'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';


export default function Notes() {
    const {notes, setNotes, setToasts} = useAppContext();
    const sortedNotes = useSortedNotes('active')
    
    const updateNoteStatus = (id, nextStatus) => {
        const changedNote = notes.find(n=>n.id === id);
        if (!changedNote) return;
        
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? 
                { ...n, status: nextStatus, pinned: false, deletedAt: nextStatus === 'deleted' ? Date.now() : '', }
                : n )
        );

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className={`${nextStatus === 'archived' ? 'archiveToast' : 'trashToast'} break-all`}>
                <strong>{nextStatus==='archived' ? 'Archived' : 'Deleted'}: </strong>
                <span>{shorten(changedNote.title)}</span>
                <button className='undoBtn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undo(changedNote.id, toastId)
                    
                    }}>Undo ↻</button>
            </div>
            ) 
        }]))
    }

    const changeNotePinned = (id) => {
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? { ...n, pinned: !n.pinned} : n 
            )
        );
    }

    function undo(noteId, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => prev.map(n => n.id === noteId ? {...n, status: 'active', deletedAt: ''} : n))
    }

    function shorten(str, n = 25) {
        return str.length > n ? str.slice(0, n) + '...' : str;
    }

    return (
        <div className="h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-4  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                
                    <div key={note.id} className='notePreviewContainer group'>      
                    <span className='bg-amber-600'>                 
                        <button   
                            className='toTrashBtn  wrap-break-word'
                            onClick={()=>{updateNoteStatus(note.id, 'deleted')}}  
                            title='Move to Trash'
                            aria-label="Move to Trash"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                        </button>
                        {note.pinned &&  
                            <button   
                                className='absolute top-0 wrap-break-word'
                                onClick={()=>{changeNotePinned(note.id)}} 
                                title='Unpin this Note'
                                aria-label="Unpin this Note"
                        >
                            <FontAwesomeIcon icon={faThumbTack} className='hover:scale-125 duration-300 ' />
                        </button>}
                        {!note.pinned &&  
                            <button   
                                className='absolute top-0 wrap-break-word'
                                onClick={()=>{changeNotePinned(note.id)}}   
                                title='Pin this Note'
                                aria-label="Pin this Note"
                        >
                            <FontAwesomeIcon icon={faThumbTack} className='hover:scale-125 duration-300 text-gray-200 hover:text-gray-400' />
                        </button>}
                        <button 
                            className='toArchiveBtn  wrap-break-word'
                            onClick={()=>{updateNoteStatus(note.id, 'archived')}}  
                            title='Move to Archive'
                            aria-label="Move to Archive"
                        >
                            <FontAwesomeIcon icon={faFolderOpen} className='hover:scale-125 duration-300' /> 
                        </button>
                    </span>
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
        <AddNewNote />
        </div>
    )
}