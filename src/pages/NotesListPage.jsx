import AddNewNote from '../components/AddNewNote';
import { useAppContext } from "../components/AppContext";
import { useSortedNotes } from '../hooks/useSortedNotes';
import NoteCard from '../components/note/NoteCard';
import { useCallback } from 'react';

export default function NotesListPage({status}) {
    const {labels, setNotes, setToasts, filter, searchQuery} = useAppContext();
    const sortedNotes = useSortedNotes(status)

    const undo = useCallback((noteId, prevStatus, prevDeletedAt, toastId) => {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev =>
            prev.map(n =>
            n.id === noteId
                ? { ...n, status: prevStatus, deletedAt: prevDeletedAt }
                : n
            )
        )
    }, [setNotes, setToasts])

    return (
        <div className="min-h-screen w-full relative p-4 pb-20">
            {/* <div className='flex flex-wrap gap-4 justify-center '> */}
            <div className="grid gap-4 justify-items-center sm:justify-items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">

            {sortedNotes.map(note => (
                <NoteCard key={note.id} note={note} labels={labels} undo={undo} />
            ))}
            {sortedNotes.length === 0 && 
                <div className='flex  mt-10 justify-center flex-1 text-xl text-(--text-default)'>
                    {status === 'active' 
                        ? 'There are no notes here.' 
                        : status === 'archived' 
                            ? 'No archived notes' 
                            : 'Trash is empty'
                    }
                    {(filter.length > 0 || (searchQuery?.trim())) && <span className='text-(--hint)'>&nbsp;Try adjusting the filter.</span> }
                </div>
            }
            </div>
        {status === 'active' && <AddNewNote />} 
        </div>
    )
}