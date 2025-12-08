import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faTrashCan, faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faBookmark, faPlus  } from '@fortawesome/free-solid-svg-icons';
import { LABEL_COLOR_CLASSES_TEXT } from "../constants/labelColors";

export default function Sidebar() {
    const {labels, filter, setFilter, openModal} = useAppContext();
    const currentLocation = useLocation()

    function changeFilters(id) {
        const value = filter.includes(id)
        value ? setFilter(prev=>prev.filter(num => num !== id)) : setFilter(prev=>[...prev, id])
        console.log(value)
    }

    return (
        <div className="p-4 flex flex-col items-start justify-between gap-10 min-w-60">
            <div className="w-full">
                <div className="">  
                    <ul className="flex flex-col justify-start items-start gap-1">
                        <li className={`${currentLocation.pathname === '/' ? 'menuLinks-active' : 'menuLinks'}`}>
                            <FontAwesomeIcon icon={faNoteSticky}  />
                            <Link to='/' title="Show active notes">Notes</Link>
                        </li>
                        <li className={currentLocation.pathname === '/archive' ?  'menuLinks-active' : 'menuLinks'}>
                            <FontAwesomeIcon icon={faFolderOpen} />
                            <Link to='archive' title="Show archived notes">Archive</Link>
                        </li>
                        <li className={currentLocation.pathname === '/trash' ?  'menuLinks-active' : 'menuLinks'}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            <Link to='trash' title="Show deleted notes">Trash</Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 w-full">
                    <div className="flex gap-2 mb-2 justify-between">
                        <h2 className="text-gray-600 text-left">Labels</h2> 
                        <button 
                            className="font-semibold text-gray-500" 
                            onClick={()=>{openModal('manageLabels')}} 
                            title="Manage labels"
                        >
                            <FontAwesomeIcon 
                                icon={faEllipsisVertical} 
                                className="text-lg hover:scale-115 hover:text-(--manageLabelsBtn) duration-300"
                            />
                        </button>
                    </div>

                    <ul className="flex flex-col justify-start items-start w-full gap-1">
                    {labels.map(label => {
                        return ( 
                            <li className={filter.includes(label.id) ? ' bg-green-100  menuLinks ' : 'menuLinks'}>
                                <FontAwesomeIcon 
                                    icon={faBookmark}  
                                    className={`${LABEL_COLOR_CLASSES_TEXT[label.color]} text-base opacity-75`}
                                /> 
                                <button 
                                    onClick={()=>changeFilters(label.id)} 
                                    className="text-left truncate max-w-[180px] text-(--labelLink)"
                                >
                                    {label.name}
                                </button>
                            </li> )   
                        })}
                    </ul>
                </div>
            </div>
            <div className="flex min-w-50 menuLinks hover:bg-amber-400">
                <FontAwesomeIcon icon={faBookmark} />
                <FontAwesomeIcon icon={faPlus} className="text-xs opacity-80" />
                <button onClick={()=>openModal('addLabel')} className=" ">New Label</button>
            </div>
        </div>
    )
}