import {useAppContext} from '../AppContext'

export default function AddNewNote() {
    const {notes, setNotes, openModal} = useAppContext();
    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button 
                onClick={()=>openModal('addNote')}
                className="relative rounded-full bg-amber-700 min-w-15 min-h-15 flex justify-center items-center text-5xl shadow"
            >
            <span className='text-white relative bottom-1'>+ </span>
            </button>
        </div>
    )
}