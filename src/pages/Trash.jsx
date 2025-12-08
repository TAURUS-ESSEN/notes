import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { LABEL_COLOR_CLASSES } from "../constants/labelColors";

export default function Trash() {
    const {labels, filter, setFilter, notes, openModal, setNotes, setToasts} = useAppContext()
    const sortedNotes = useSortedNotes('deleted');

    function changeFilters(id) {
        const value = filter.includes(id)
        value ? setFilter(prev=>prev.filter(num => num !== id)) : setFilter(prev=>[...prev, id])
        console.log(value)
    }

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
                        <span className='flex justify-end gap-1 text-gray-400 hover:text-gray-600 transition'>                      
                        <button 
                            className='toArchiveBtn'
                            onClick={()=>{restoreNoteFromTrash(note.id)}}
                            title='Move to Notes'
                            aria-label="Move to Notes"
                        >
                            <FontAwesomeIcon icon={faNoteSticky} className='hover:scale-125 duration-300' /> 
                        </button>
                        <button   
                            className='toTrashBtn'
                            onClick={()=>openModal('deleteNote', note.id)}
                            title='Move to Trash'
                            aria-label="Move to Trash"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                        </button>

                        </span>
                        <Link to={`/edit/${note.id}`}  title='Click to edit this note' className='flex flex-1'>
                            <div className='notePreview'>
                                <div className='line-clamp-2 font-semibold break-all text-(--title-card)'>{note.title} </div>
                                <div className='text-sm line-clamp-3 break-all text-(--text-card)'> { note.text }</div>
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
        </div>
    )
}