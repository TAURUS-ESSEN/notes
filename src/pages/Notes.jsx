import {Link} from 'react-router-dom'
import AddNewNote from '../components/modal/AddNewNote'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { LABEL_COLOR_CLASSES } from "../constants/labelColors";


export default function Notes() {
    const {labels, filter, setFilter, notes, setNotes, setToasts} = useAppContext();
    const sortedNotes = useSortedNotes('active')
    
    function changeFilters(id) {
        const value = filter.includes(id)
        value ? setFilter(prev=>prev.filter(num => num !== id)) : setFilter(prev=>[...prev, id])
        console.log(value)
    }

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
                
                    <div key={note.id} className='notePreviewContainer  group'>      
                    <span className='flex justify-end gap-1 text-gray-300 hover:text-gray-700 transition'>                 
                        <button   
                            className='break-all'
                            onClick={()=>{changeNotePinned(note.id)}} 
                            title={note.pinned ? 'Unpin this Note' : 'Pin this Note'}
                            aria-label={note.pinned ? 'Unpin this Note' : 'Pin this Note'}
                        >
                            <FontAwesomeIcon
                                icon={faThumbTack}
                                className={ 'hover:scale-125 duration-300 ' + (note.pinned ? 'text-gray-900' : 'text-gray-300 hover:text-gray-400') }
                            />                        
                        </button>

                        <button 
                            className='toArchiveBtn break-all'
                            onClick={()=>{updateNoteStatus(note.id, 'archived')}}  
                            title='Move to Archive'
                            aria-label="Move to Archive"
                        >
                            <FontAwesomeIcon icon={faFolderOpen} className='hover:scale-125 duration-300' /> 
                        </button>                       
                        <button   
                            className=' toTrashBtn break-all'
                            onClick={()=>{updateNoteStatus(note.id, 'deleted')}}  
                            title='Move to Trash'
                            aria-label="Move to Trash"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                        </button>
                    </span>
                        <Link to={`/edit/${note.id}`}  title='Click to edit this note' className='flex flex-1'>
                            <div className='notePreview '>
                                <div className='line-clamp-2 font-semibold break-all'>{note.title} </div>
                                <div className='text-sm line-clamp-3 break-all'> { note.text }</div>
                            </div>
                        </Link>
                        <div className='flex mt-4 flex-wrap gap-2'>
                            {labels.map(label=> {
                                if (note.labels.includes(label.id)) {
                                    return (
                                        <button 
                                            key={label.id} 
                                            onClick={()=>changeFilters(label.id)} 
                                            className={`${LABEL_COLOR_CLASSES[label.color]} labelTag`}
                                            title={`Show all notes with "${label.name}"`}
                                        >
                                            {label.name}
                                        </button>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            )}
            </div>
        <AddNewNote />
        </div>
    )
}