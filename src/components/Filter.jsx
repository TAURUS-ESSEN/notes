import { useAppContext } from "./AppContext"

export default function Filter({mode}) {
    const {setSortBy} = useAppContext();

    return (
        <div className="p-2 flex">
            <select className="border border-gray-300 bg-(--bg-select) text-(--text-default)" onChange={(e)=>setSortBy(prev=>({...prev, [mode]:e.target.value}))}>
                {mode === 'deleted' && <option value={'lastDeleted'}>Last Deleted</option>}
                <option value={'new'} default>New first</option>
                <option value={'old'}>Old first</option>
                <option value={'az'}>A-z</option>
                <option value={'za'}>z-A</option>
            </select>  
        </div>
    )
}