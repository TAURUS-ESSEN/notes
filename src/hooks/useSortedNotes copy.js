    import { useAppContext } from "../components/AppContext";
    import { useMemo } from "react";

    export function useSortedNotes(status) {
        const { notes, filter, searchQuery, sortBy } = useAppContext();
        
        const sorted = useMemo(() => {
            const arr = notes.filter(note => 
                note.status === status &&
                (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.text.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (filter.length === 0 || note.labels?.some(id => filter.includes(id)))  
            );

            
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
            return arr } 
        , [notes, sortBy, status, searchQuery, filter]);
        return sorted
    }
