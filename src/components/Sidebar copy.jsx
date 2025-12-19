import { Link, useLocation } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";
import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faTrashCan, faNoteSticky,  faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faBookmark, faPlus} from '@fortawesome/free-solid-svg-icons';
import LabelsList from "./LabelList";

export default function Sidebar() {
    const {labels, setLabels, filter, openModal, toggleLabelFilter} = useAppContext();
    const currentLocation = useLocation()

    const navLinks = [
        { path: '/',        to: '/',       label: 'Notes',   icon: faNoteSticky, title: 'Show active notes [Alt+1]' },
        { path: '/archive', to: '/archive', label: 'Archive', icon: faFolderOpen, title: 'Show archived notes [Alt+2]' },
        { path: '/trash',   to: '/trash',   label: 'Trash',   icon: faTrashCan, title: 'Show deleted notes [Alt+3]' },
    ];

    const dropActive = useDroppable({
        id: "drop-active",
        data: { nextStatus: "active" },
    });

    const dropArchived = useDroppable({
        id: "drop-archived",
        data: { nextStatus: "archived" },
    });

    const dropDeleted = useDroppable({
        id: "drop-deleted",
        data: { nextStatus: "deleted" },
    });

    const dropByPath = {
        "/": dropActive,
        "/archive": dropArchived,
        "/trash": dropDeleted,
    };

    useEffect(()=>{
        const onKey = (e) => {
            if (e.key.toLowerCase() === 'l' && e.altKey) {
                openModal('addLabel')
            }
        }
        document.addEventListener('keydown', onKey)
        return ()=> {document.removeEventListener('keydown', onKey)}
    },[openModal])

    return (
        <div className="p-4 flex flex-col items-start justify-between gap-10">
            <div className="w-full">
                <div className="">  
                    <ul className="flex flex-col justify-start items-start gap-1">
                        {navLinks.map(item => {
                            const isActive = currentLocation.pathname === item.path;
                            const drop = dropByPath[item.path];

                            return (
                                <li
                                    key={item.path}
                                    ref={drop?.setNodeRef}
                                    className={
                                        (isActive ? "menuLinks-active" : "menuLinks") +
                                        (drop?.isOver ? " ring-2 ring-amber-400" : "")
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <Link to={item.to} title={item.title}>{item.label}</Link>
                                    
                                </li>
                            );
                        })}
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
                    <LabelsList
                        labels={labels}
                        filter={filter}
                        onToggle={toggleLabelFilter} 
                        onSort={(newOrder) => setLabels(newOrder)}
                    />
                </div>
            </div>
            <div className="flex min-w-50 menuLinks hover:bg-amber-400">
                <FontAwesomeIcon icon={faBookmark} />
                <FontAwesomeIcon icon={faPlus} className="text-xs opacity-80" />
                <button onClick={()=>openModal('addLabel')} className="relative group">
                    New Label
                    <span className="tooltip">
                        Add new Label <FontAwesomeIcon icon={faKeyboard} /> Alt+L
                    </span>
                </button>
            </div>
        </div>
    )
}