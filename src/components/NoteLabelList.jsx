import { useAppContext } from "./AppContext";
import { LABEL_COLOR_CLASSES } from "../constants/labelColors";

export default function NoteLabelList({labels,note}) {
    const {changeFilters} = useAppContext(); 

    return (
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
    )
}