import {Link} from 'react-router-dom';
import AddNewNote from '../components/AddNewNote';
import { useAppContext } from "../components/AppContext";
import {useSortedNotes} from '../hooks/useSortedNotes';
import { LABEL_COLOR_CLASSES } from "../constants/labelColors";
import NoteCardButtons from './NoteCardButtons'


export default function Notes() {
    const {labels, notes, setNotes, setToasts, changeFilters} = useAppContext();
    const sortedNotes = useSortedNotes('active')
    
    function undo(noteId, toastId) {
        setToasts(prev => prev.filter(t => t.toastId !== toastId));  
        setNotes(prev => prev.map(n => n.id === noteId ? {...n, status: 'active', deletedAt: ''} : n))
    }
    
    return (
        <div className="h-screen w-full relative p-4 ">
            <div className='flex flex-wrap gap-4  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                    <div key={note.id} className='notePreviewContainer group'>   
                        <NoteCardButtons note={note}  undo={undo}/>
                        <Link to={`/edit/${note.id}`}  title='Click to edit this note' className='flex flex-1'>
                            <div className='notePreview '>
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
            {sortedNotes.length === 0 && 
                <div className='flex  mt-10 justify-center flex-1 text-xl text-(--text-default)'>
                    There are no notes here.
                    <span className='text-(--hint)'>&nbsp;Try adjusting the filter.</span>
                </div>
            }
            </div>
        <AddNewNote />
        </div>
    )
}