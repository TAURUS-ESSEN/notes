    import { useAppContext } from "../components/AppContext";
    import { useMemo } from "react";

    export function useSortedNotes(status) {
        const { notes, filter, searchQuery, sortBy } = useAppContext();
        const searchQ = (searchQuery ?? '').toLowerCase().trim()
        
        const sorted = useMemo(() => {
            const arr = notes.filter(note => {
                const title = (note.title ?? '').toLowerCase();
                const text  = (note.text ?? '').toLowerCase();

                return note.status === status &&
                    (title.includes(searchQ) || text.includes(searchQ)) &&
                    (filter.length === 0 || note.labels?.some(id => filter.includes(id)))  
            });
            
            const sortArray = (value) => {
                if (sortBy[status] === 'new') {value.sort((a,b)=>b.createdAt - a.createdAt)}
                if (sortBy[status] === 'old') {value.sort((a,b)=>a.createdAt - b.createdAt)}
                if (sortBy[status] === 'az') {value.sort((a,b)=>a.title.localeCompare(b.title))}
                if (sortBy[status] === 'za') {value.sort((a,b)=>b.title.localeCompare(a.title))}
                if (status === 'deleted' && sortBy[status] === 'lastDeleted') {value.sort((a,b)=>b.deletedAt - a.deletedAt)}  
                return value
            }

            if (status === 'active') {
                const pinnedArr = arr.filter(note => note.pinned)
                const notPinnedArr = arr.filter(note => !note.pinned)

                const unitedArray = [...sortArray(pinnedArr), ...sortArray(notPinnedArr)]
                return unitedArray
            }
            else  {
                return sortArray(arr)
            }
        } 
        , [notes, sortBy, status, filter, searchQ]);
        return sorted
    }
