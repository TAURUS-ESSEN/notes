import { useAppContext } from "./AppContext"
import { useLocation } from "react-router-dom";
import Filter from "./Filter";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const {searchQuery, setSearchQuery} = useAppContext();
    const [showInput, setShowInput] = useState(false);
    const currentLocation = useLocation()
    const thisPage = currentLocation.pathname;
    const routeToStatus = {
        '/': 'active',
        '/archive': 'archived',
        '/trash': 'deleted'
        };
    const routeToTitle = {
        '/': 'Notes',
        '/archive': 'Archive',
        '/trash': 'Trash',
        };
        
    function checkBlur(e) {
        if (!e.target.value.trim()) {
        setShowInput(false);
    }
}
    return (
        <div className="flex justify-between items-center w-full gap-4 p-2 ">
            <div>
                {(thisPage === '/' || thisPage === '/archive' || thisPage === '/trash') && (
                    <div className="">
                        <Filter mode={routeToStatus[thisPage]}/>
                    </div>
                )}
            </div> 
        <h1 className="text-3xl font-semibold text-gray-700 ">
            {routeToTitle[thisPage] } {thisPage.includes('/edit/') ? 'Note editing' : ''}
        </h1>
        <div className="flex gap-4 items-center">
            {(thisPage === '/' || thisPage === '/archive' || thisPage === '/trash') && (
                <>
                {/* <button>:::</button> */}
                <div>
                    {showInput && <input 
                        type="text"
                        autoFocus 
                        className="border max-h-10" 
                        onChange={(e)=>setSearchQuery(e.target.value)} 
                        onBlur={(e) => checkBlur(e)}
                        value={searchQuery}
                        placeholder="Search notes"
                        />
                    }
                    {!showInput && 
                        <button onClick={() => setShowInput(true)} title="Search notes">
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                className="hover:scale-115 hover:text-amber-700 duration-300 text-gray-600 text-xl"
                            />
                        </button>}
                </div>
                </>
        )}

        </div>
            {/* {searchQuery} */}
        </div>
    )
}