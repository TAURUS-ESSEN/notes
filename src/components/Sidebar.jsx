import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faFolderOpen, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faBookmark  } from '@fortawesome/free-solid-svg-icons';
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
                    <ul className="flex flex-col justify-start items-start">
                        <li className={`${currentLocation.pathname === '/' ? 'bg-amber-400 menuLinks ' : 'menuLinks'} min-h-10`}>
                            <FontAwesomeIcon icon={faLightbulb}  /><Link to='/' className=" ">Notes</Link>
                        </li>
                        <li className={currentLocation.pathname === '/archive' ?  'bg-amber-400  menuLinks ' : 'menuLinks'}>
                            <FontAwesomeIcon icon={faFolderOpen} /><Link to='archive' className="menuLinks">Archive</Link>
                        </li>
                        <li className={currentLocation.pathname === '/trash' ?  'bg-amber-400  menuLinks ' : 'menuLinks'}>
                            <FontAwesomeIcon icon={faTrashCan} /><Link to='trash' className="menuLinks">Trash</Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 w-full">
                    <div className="flex gap-2 mb-2 justify-between">
                        <h2 className="text-gray-600 text-left">Labels</h2> 
                        <button className="font-semibold text-gray-500" onClick={()=>{openModal('manageLabels')}} title="Manage labels">
                            <FontAwesomeIcon icon={faEllipsisVertical} className="text-lg hover:scale-115 hover:text-gray-700 duration-300" />
                        </button>
                    </div>

                    <ul className="flex flex-col justify-start items-start w-full gap-1">
                    {labels.map(label => {
                        return ( 
                            <li className={filter.includes(label.id) ? ' bg-green-100  menuLinks ' : 'menuLinks'}>
                                <FontAwesomeIcon icon={faBookmark}  className={`${LABEL_COLOR_CLASSES_TEXT[label.color]} text-base opacity-75`}/> 
                                <button onClick={()=>changeFilters(label.id)} className="text-left truncate max-w-[180px] text-gray-600">
                                    {label.name}
                                </button>
                            </li> )   
                        })}
                    </ul>
                    {/* {filter.length}  */}
                </div>
            </div>
            <div className="flex min-w-50 menuLinks hover:bg-amber-400">
                <img src='addLabel.webp' width={25} className="block"/> 
                <button onClick={()=>openModal('addLabel')} className=" ">New Label</button>
            </div>
        </div>
    )
}