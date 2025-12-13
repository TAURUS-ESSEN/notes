
import {Link} from 'react-router-dom';
import NoteCardButtons from './NoteCardButtons'
import NoteLabelList from './NoteLabelList';

export default function NoteCard({note, labels, undo}) {

    return (
        <div className='notePreviewContainer group'>   
                        <NoteCardButtons note={note}  undo={undo}/>
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