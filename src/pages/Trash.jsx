import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes'
import NoteCard from '../components/note/NoteCard';

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
            {notes.length > 0 && sortedNotes.map(note=> 
                <NoteCard note={note} labels={labels} undo={undoRestore} key={note.id}/>
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