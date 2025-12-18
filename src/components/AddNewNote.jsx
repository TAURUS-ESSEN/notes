import {useAppContext} from './AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard} from '@fortawesome/free-regular-svg-icons';

export default function AddNewNote() {
    const {openModal} = useAppContext();
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
            <button 
                onClick={()=>openModal('addNote')}
                className="relative group min-w-15 min-h-15 flex justify-center items-center
                    text-5xl rounded-full bg-amber-500 shadow hover:scale-110 duration-300 hover:bg-amber-600"
            >
            <span className='text-white relative bottom-1'> + </span>
                <span className="tooltip">
                    Add new note <FontAwesomeIcon icon={faKeyboard} /> Alt+N
                </span>
            </button>
        </div>
    )
}