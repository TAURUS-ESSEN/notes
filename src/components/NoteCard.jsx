import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import NoteCardButtons from './NoteCardButtons'
import NoteLabelList from './NoteLabelList';

export default function NoteCard({note, labels, undo}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: `note-${note.id}`, data: { type: 'note', noteId: note.id, fromStatus: note.status } })

    const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 10 : 0,
    boxShadow: isDragging ? "0 2px 6px rgba(0,0,0,0.15)" : "none", 
    opacity: isDragging ? 0 : 1,

  };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            className='notePreviewContainer group'
            
        >  
                    <span className="flex justify-between items-center">
                        <FontAwesomeIcon             
                            {...listeners} 
                            {...attributes}
                            icon={faGrip} 
                            className={'text-xs text-gray-300 mr-4 cursor-grab'}
                        /> 
                        <NoteCardButtons note={note} undo={undo}/>
                    </span>
                        <Link to={`/edit/${note.id}`}  title='Click to edit this note' className='flex flex-1'>
                            <div className='notePreview '>
                                <div className='line-clamp-2 font-semibold break-all text-(--title-card)'>{note.title} </div>
                                <div className='text-sm line-clamp-3 break-all text-(--text-card)'> { note.text }</div>
                            </div>
                        </Link>
                        <NoteLabelList labels={labels} note={note} />
                    </div>
    )
}