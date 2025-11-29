    import { useAppContext } from "./AppContext";
    import { useMemo } from "react";

    export function useSortedNotes(status) {
        const { notes, sortBy } = useAppContext();
        
        const sorted = useMemo(() => {
            const arr = notes.filter(note => note.status === status);
            if (sortBy[status] === 'new') 
                {arr.sort((a,b)=>b.createdAt - a.createdAt)}
            if (sortBy[status] === 'old') 
                {arr.sort((a,b)=>a.createdAt - b.createdAt)}
            if (sortBy[status] === 'az') 
                {arr.sort((a,b)=>a.title.localeCompare(b.title))}
            if (sortBy[status] === 'za') 
                {arr.sort((a,b)=>b.title.localeCompare(a.title))}
            return arr } 
        , [notes, sortBy, status]);
        return sorted
    }
