import {Link} from 'react-router-dom'
import { useAppContext } from "../components/AppContext";
import Filter from '../components/Filter';
import {useSortedNotes} from '../hooks/useSortedNotes'

export default function Trash() {
    const {notes, openModal, setNotes} = useAppContext()
    const sortedNotes = useSortedNotes('deleted');
    
    return (
        <div className="bg-amber-100 h-screen w-full relative p-4 ">
            {/* <Filter mode='deleted'/> */}
            <div className='flex flex-wrap gap-6  '>
            {notes.length > 0 && sortedNotes.map(note=> ( 
                // note.status === 'deleted' && (
                    <div key={note.id} className='bg-white rounded p-4 max-w-100 relative group'>                        
                        <button 
                            className='absolute top-1 right-1 opacity-0  group-hover:opacity-100  text-black border'
                            onClick={()=>openModal('deleteNote', note.id)}

                        >
                            X 
                        </button>
                        <button 
                            className='absolute top-1 left-1 opacity-0  group-hover:opacity-100  text-black border'
                            onClick={()=>setNotes(prev => prev.map(n => n.id === note.id ? {...n, status: 'active', deletedAt: ''} : n))}  
                        >
                            R 
                        </button>
                        <Link to={`/edit/${note.id}`}>
                        <div className='flex flex-col'>
                            <div>{note.title} </div>
                            <div>{note.text}</div>
                        </div></Link>
                    </div> 
                )
            )}</div>
            
        </div>
    )
}