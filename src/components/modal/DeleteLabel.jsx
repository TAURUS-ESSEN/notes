import { useAppContext } from "../AppContext";

export default function DeleteLabel({setDeleteId, label}) {
    const {setLabels, setNotes, setToasts, notes} = useAppContext();

    function deleteLabel(label) {
        setLabels(prev=>prev.filter(l=>l.id!==label.id));
        setNotes(prev=>prev.map(note=> {
        if (note.labels.includes(label.id)) {
            return {...note, labels: note.labels.filter(l=>l!==label.id)}
        }
        else return note
        }))

        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast justify-center text-center'>
                <span> Label {label.name} deleted. (affects {quantity(label.id)} notes)</span>
            </div>
        )}])) 
        setDeleteId(null);
    }

    function quantity(id) {
        return notes.filter(note => Array.isArray(note.labels) && note.labels.includes(id)).length
    }

    return (
        <>
            <div className="p-4">
                <div className="flex flex-col justify-center gap-2 border border-orange-700  bg-orange-200 rounded-xl p-2 text-red-950">
                    <span className="text-center">Are you sure you really want to delete this label? </span>
                    <span className="text-center">Deleting this label will affect {quantity(label.id)} notes.</span>
                        <span className="flex justify-around">
                            <button className="btn cancel w-20" onClick={()=>{setDeleteId(null)}}>Cancel</button>
                            <button className="btn bg-red-700 hover:bg-red-800 text-white px-2 w-20 hover:scale-105 duration-300 rounded-lg" onClick={()=>deleteLabel(label)}>Delete</button>
                        </span>
                </div>
            </div>        
        </>
    )
}