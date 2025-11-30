import { useAppContext } from "./AppContext"
import { useLocation } from "react-router-dom";
import Filter from "./Filter";

export default function Header() {
    const {searchQuery, setSearchQuery} = useAppContext();
    // const { noteId} = useParams();
    const currentLocation = useLocation()
    const routeToStatus = {
        '/': 'active',
        '/archive': 'archived',
        '/trash': 'deleted'
        };
    const routeToTitle = {
        '/': 'Notes',
        '/archive': 'Archive',
        '/trash': 'Trash'
        };    
    return (
        <div className="flex justify-between items-center w-full gap-4 p-2 ">
        <div>
            {
            (currentLocation.pathname === '/' || currentLocation.pathname === '/archive' || currentLocation.pathname === '/trash') && (
                <div className="">
                <Filter mode={routeToStatus[currentLocation.pathname]}/>

                </div>
            )
            
            }
        </div> 
                        <h1 className="text-3xl font-semibold text-gray-700">{routeToTitle[currentLocation.pathname] }</h1>
        <div className="flex gap-4 items-center">
            <button>:::</button>
            <input type="text" className="border max-h-10" onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} /></div>   
            {/* {searchQuery} */}
        </div>
    )
}