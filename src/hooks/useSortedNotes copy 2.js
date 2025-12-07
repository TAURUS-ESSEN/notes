    import { useAppContext } from "../components/AppContext";
    import { useMemo } from "react";

    export function useSortedNotes(status) {
        const { notes, filter, searchQuery, sortBy } = useAppContext();

        const sortBy1 = (value) => {
            if (sortBy[status] === 'new') {
                value.sort((a,b)=>b.createdAt - a.createdAt)
            }
             if (sortBy[status] === 'old') {
                    pinnedArr.sort((a,b)=>a.createdAt - b.createdAt)
                    notPinnedArr.sort((a,b)=>a.createdAt - b.createdAt)
                }
        }

        
        const sorted = useMemo(() => {
            const arr = notes.filter(note => 
                note.status === status &&
                (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.text.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (filter.length === 0 || note.labels?.some(id => filter.includes(id)))  
            );




            if (status === 'active') {
                const pinnedArr = arr.filter(note => note.pinned === true)
                const notPinnedArr = arr.filter(note => note.pinned === false)
                if (sortBy[status] === 'new') {
                    pinnedArr.sort((a,b)=>b.createdAt - a.createdAt)
                    notPinnedArr.sort((a,b)=>b.createdAt - a.createdAt)
                }
                if (sortBy[status] === 'old') {
                    pinnedArr.sort((a,b)=>a.createdAt - b.createdAt)
                    notPinnedArr.sort((a,b)=>a.createdAt - b.createdAt)
                }
                if (sortBy[status] === 'az') {
                    pinnedArr.sort((a,b)=>a.title.localeCompare(b.title))
                    notPinnedArr.sort((a,b)=>a.title.localeCompare(b.title))
                }          
                if (sortBy[status] === 'za') {
                    pinnedArr.sort((a,b)=>b.title.localeCompare(a.title))
                    notPinnedArr.sort((a,b)=>b.title.localeCompare(a.title))
                }
                const unitedArray = [...pinnedArr, ...notPinnedArr]
                return unitedArray
            }
            else  {
                if (sortBy[status] === 'new') 
                {arr.sort((a,b)=>b.createdAt - a.createdAt)}
                if (sortBy[status] === 'old') 
                    {arr.sort((a,b)=>a.createdAt - b.createdAt)}
                if (sortBy[status] === 'az') 
                    {arr.sort((a,b)=>a.title.localeCompare(b.title))}
                if (sortBy[status] === 'za') 
                    {arr.sort((a,b)=>b.title.localeCompare(a.title))}
                if (sortBy[status] === 'lastDeleted') 
                    {arr.sort((a,b)=>b.deletedAt - a.deletedAt)} 
                return arr 
            }
        //  return arr 
           } 
        , [notes, sortBy, status, searchQuery, filter]);
        return sorted
    }
