export default function EditNoteActions({note, changeStatus, onCancel, deleteNote}) {
    return (
        <>
<div className='flex justify-around gap-4 lg:gap-10 mt-6 mb-4 flex-wrap '>
                    <button 
                        type='button' 
                        className='btn relative group hover:bg-gray-200 ' 
                        onClick={onCancel} 
                        title="Cancel editing"
                    > 
                        Cancel <span className="hotkey ">(Esc)</span>
                    </button>

                    {(note.status === 'deleted' || note.status === 'archived') &&
                    <button 
                        type='button' 
                        className='btn group hover:bg-green-600 hover:text-white ' 
                        onClick={()=>changeStatus('active')} 
                        title="Restore note"
                    > 
                        Restore
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+W)
                        </span>
                    </button>}

                    { note.status !== 'archived' && note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        className='btn hover:bg-amber-300' 
                        onClick={()=>changeStatus('archived')} 
                        title="Archive note">  
                        Archive <span className="hotkey">(Alt+A)</span>
                    </button>}

                    { note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        onClick={()=>changeStatus('deleted')} 
                        className='btn group hover:bg-red-500 hover:text-white' 
                        title="Delete note"
                    >
                        Delete 
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+D)
                        </span>
                    </button>}
                    
                    { note.status === 'deleted' &&
                    <button 
                        type='button' 
                        className='btn group bg-red-600 text-white w-35' 
                        onClick={()=>deleteNote(note.id)} 
                        title="Delete forever"
                    > 
                        <div className="flex flex-col items-center leading-tight">
                            <span className="text-base font-medium">Delete forever</span>
                            <span className="text-xs opacity-70">(Alt+Shift+D)</span>
                        </div>
                    </button>}
                    
                    { note.status !== 'deleted' &&
                        <button 
                            type='submit' 
                            className='btn apply order-first md:order-4' 
                            title="Save changes (Alt+S)"
                        >
                            Update <span className=" text-xs ml-1 text-white">(Alt+S)</span>
                        </button>}
                </div>        
        </>
    )
}