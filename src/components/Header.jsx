import { useAppContext } from "./AppContext"

export default function Header() {
    const {searchQuery, setSearchQuery} = useAppContext();

    return (
        <div className="flex justify-between w-full gap-4 p-2 bg-gray-300">
        <div>Notes</div> 
        <div className="flex gap-4">
            <button>:::</button>
            <input type="text" className="border" onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} /></div>   
            {searchQuery}
        </div>
    )
}