import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faTrashCan, faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../AppContext";

export default function NoteCardButtons({note, undo}) {
    const {notes, setNotes, setToasts, openModal} = useAppContext();

        const updateNoteStatus = (id, nextStatus) => {
  
        const changedNote = notes.find(n=>n.id === id);      
        const prevStatus = changedNote.status;
        const prevDeletedAt = changedNote.deletedAt ?? null;
        if (!changedNote) return;
        
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? 
                { ...n, status: nextStatus, pinned: false, deletedAt: nextStatus === 'deleted' ? Date.now() : null, }
                : n )
        );

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className={`${nextStatus === 'archived' 
                ? 'archiveToast' 
                : nextStatus === 'active' 
                    ? 'activeToast' 
                    : 'trashToast'} break-all`}>
                <strong>
                    {nextStatus === 'archived' 
                    ? 'Archived' 
                    : nextStatus === 'active' 
                        ? 'Restored' 
                        : 'Deleted'}: 
                </strong>
                <span>{shorten(changedNote.title)}</span>
                <button className='undoBtn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undo(changedNote.id, prevStatus, prevDeletedAt, toastId)
                    
                    }}>Undo ↻</button>
            </div>
            ) 
        }]))
    }

    function shorten(str, n = 25) {
            return str.length > n ? str.slice(0, n) + '...' : str;
        }

        const changeNotePinned = (id) => {
        setNotes(prev =>
            prev.map(n => 
                n.id === id ? { ...n, pinned: !n.pinned} : n 
            )
        );
    }

    return (
            <span className='flex justify-end gap-1'>
                {/* Move To Active Button */}
                {note.status !=='active' &&  
                <button 
                    className='toArchiveBtn'
                    onClick={()=>{updateNoteStatus(note.id, 'active')}} 
                    title='Move to Notes'
                    aria-label="Move to Notes"
                    >
                        <FontAwesomeIcon icon={faNoteSticky} className='hover:scale-125 duration-300' /> 
                </button> }
                        
                {/* Pin and archive button */}
                {note.status==='active' && <>            
                    <button   
                        className='break-all'
                        onClick={()=>{changeNotePinned(note.id)}} 
                        title={note.pinned ? 'Unpin this Note' : 'Pin this Note'}
                        aria-label={note.pinned ? 'Unpin this Note' : 'Pin this Note'}
                    >
                        <FontAwesomeIcon
                            icon={faThumbTack}
                            className={ 'hover:scale-125 duration-300 ' + (note.pinned ? 'text-(--text-pinned) ' : 'text-(--text-notpinned) hover:text-gray-400 opacity-0 group-hover:opacity-100 duration-300') }
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
                </> }
                {/* delete button */} 
                    <button   
                        className=' toTrashBtn break-all'
                        onClick={()=>{ note.status==='deleted' ? openModal('deleteNote', note.id) : updateNoteStatus(note.id, 'deleted')}}  
                        title='Move to Trash'
                        aria-label="Move to Trash"
                    >
                        <FontAwesomeIcon icon={faTrashCan} className='hover:scale-125 duration-300 ' />
                    </button>
                </span>        
    )


}