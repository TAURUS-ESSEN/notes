
import DeleteLabel from "./DeleteLabel.jsx";
import ColorPicker from '../ColorPicker.jsx';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faGrip} from '@fortawesome/free-solid-svg-icons';
import { LABEL_COLOR_CLASSES_TEXT } from "../../constants/labelColors";

export default function SortedLabelRow({label, isEditing, draft, setDraft, startEdit, saveEdit, setDeleteId, setLabelColor, labelColor, isDeleting}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: label.id });
    
        const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // cursor: "grab",
    borderRadius: '8px',
    position: 'relative',
    zIndex: isDragging ? 10 : 0,
    boxShadow: isDragging ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
    backgroundColor: isDragging ? "#fef3c7" : undefined,  
  };
    return (
        <>
        <li       
            ref={setNodeRef}
            style={style}
            className="min-w-120 odd:bg-gray-100 even:bg-white overflow-y-auto"
            {...attributes}
            // {...listeners} 
        >
            
            <div className="flex items-center justify-between p-2">
                <span className="flex items-center justify-between px-2">
                    {isEditing ? (
                        <input
                            value={draft}
                            onChange={e => setDraft(e.target.value)}
                            className="border px-1"
                            autoFocus
                        />
                        ) : (
                        <span {...listeners} className="truncate max-w-[180px] ">
                            <FontAwesomeIcon             
                                {...listeners} 
                                icon={faGrip} 
                                className={'text-xs text-gray-300 mr-4 cursor-grab'}
                            />
                            <FontAwesomeIcon
                                icon={faBookmark}
                                className={`${LABEL_COLOR_CLASSES_TEXT[label.color]} text-base opacity-75 mr-1`}
                            />
                            {label.name}
                        </span>
                        )}
                </span>
                <span className="flex items-center px-2 justify-between gap-4">
                    {!isEditing ? (
                        <button 
                            onClick={() => startEdit(label)} 
                            className="btn editBtn">
                                edit
                        </button>
                        ) : (
                        <button 
                            onClick={() => saveEdit(label)} 
                            className="btn saveBtn"
                        >
                            save
                        </button>
                    )}

                    <button onClick={() => setDeleteId(label.id)} className="btn deleteBtn">
                        delete
                    </button>
                </span>
            </div>
                {isEditing && 
                    <div className="p-4">
                        <ColorPicker setLabelColor={setLabelColor} labelColor={labelColor} /> 
                    </div>}
                {isDeleting && (
                    <DeleteLabel setDeleteId={setDeleteId} label={label} />
                )}
        </li>            
        </>
    )
}