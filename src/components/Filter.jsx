import { useAppContext } from "./AppContext"

export default function Filter({mode}) {
    const {sortBy, setSortBy} = useAppContext();
 

    return (
        <div className="border p-2 flex">
            <select className="border" onChange={(e)=>setSortBy(prev=>({...prev, [mode]:e.target.value}))}>
                <option value={'new'} default>New first</option>
                <option value={'old'}>Old first</option>
                <option value={'az'}>A-z</option>
                <option value={'za'}>z-A</option>
            </select>  {mode}:{sortBy[mode]} 
            
        </div>
    )
}