import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes'
import NoteCardButtons from './NoteCardButtons';
import NoteLabelList from '../components/NoteLabelList';

export default function Trash() {
    const {labels, notes, setNotes, setToasts} = useAppContext()
    const sortedNotes = useSortedNotes('deleted');

    function undoRestore(noteId, deletedAt, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => prev.map(n => n.id === noteId ? {...n, status: 'deleted', deletedAt, } : n))
    }

    return (
        <div className="h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-4  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                
                    <div key={note.id} className='notePreviewContainer group'>
                        <NoteCardButtons note={note}  undo={(id, toastId) => undoRestore(id, note.deletedAt, toastId)}/>

                        <Link to={`/edit/${note.id}`}  title='Click to edit this note' className='flex flex-1'>
                            <div className='notePreview'>
                                <div className='line-clamp-2 font-semibold break-all text-(--title-card)'>{note.title} </div>
                                <div className='text-sm line-clamp-3 break-all text-(--text-card)'> { note.text }</div>
                            </div>
                        </Link>
                        <NoteLabelList labels={labels} note={note} />    
                    </div> 
                )
            )}
            {sortedNotes.length === 0 && 
                <div className='flex  mt-10 justify-center flex-1 text-xl text-(--text-default)'>
                    There are no notes here.
                    <span className='text-(--hint)'>&nbsp;Try adjusting the filter.</span>
                </div>
            }
            </div>
        </div>
    )
}