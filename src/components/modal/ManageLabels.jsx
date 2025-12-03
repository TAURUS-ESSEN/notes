import { useAppContext } from "../AppContext";
import { useState } from 'react';
import Modal from './Modal';

export default function ManageLabels() {
    const {closeModal, notes, setNotes, labels, setLabels, setToasts } = useAppContext(); 
    const [editingId, setEditingId] = useState(null);   // id того, кто сейчас редактируется
    const [deleteId, setDeleteId] = useState(null);
    const [draft, setDraft] = useState("");             // временный текст для инпута


    function startEdit(label) {
        setEditingId(label.id);       // запоминаем, какой именно label редактируем
        setDraft(label.name);         // подставляем текущее имя в input
    }

    function saveEdit(label) {
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <span> Label <strong>"{label.name}"</strong>renamed to {draft} </span>
            </div>
            )}])) 
        setLabels(prev =>
            prev.map(l => l.id === label.id ? { ...l, name: draft } : l)
        );
        setEditingId(null);           // выходим из режима редактирования
        setDraft("");
    }

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
        <Modal title="Labels management" closeModal={closeModal}>
            <ul className="bg-gray-100 rounded-xl">
                {labels.map(label => {
                const isEditing = editingId === label.id;
                const isDeleting = deleteId === label.id;

                return (
                    <li key={label.id} className="min-w-100  even:bg-gray-50  mb-2 overflow-y-auto">
                        <div className="flex items-center justify-between p-2 ">
                            <span className="flex items-center px-2 justify-between gap-4">
                                {isEditing ? (
                                    <input
                                    value={draft}
                                    onChange={e => setDraft(e.target.value)}
                                    className="border px-1"
                                    autoFocus
                                    />
                                ) : (
                                    <span>{label.name}</span>
                                )}

                                {!isEditing ? (
                                    <button onClick={() => startEdit(label)} className="btn bg-blue-400 text-white hover:bg-blue-600 duration-300">edit</button>
                                ) : (
                                    <button onClick={() => saveEdit(label)}>save</button>
                                )}
                                </span>
                            <button onClick={() => setDeleteId(label.id)} className="btn bg-red-400 hover:bg-red-500 duration-300 text-white">delete</button>
                        </div>
                        <div className="p-4">
                            {isDeleting && (
                                <div className="flex flex-col justify-center gap-2 border border-orange-700  bg-orange-200 rounded-xl p-2 text-red-950">
                                    <span className="text-center">Are you sure you really want to delete this label? </span>
                                    <span className="text-center">Deleting this label will affect {quantity(label.id)} notes.</span>
                                    
                                    <span className="flex justify-around">
                                        <button className="btn cancel" onClick={()=>{setDeleteId(null)}}>Cancel</button>
                                        <button className="btn bg-red-700 text-white px-2" onClick={()=>deleteLabel(label)}>Delete</button>
                                    </span>
                                </div>
                                )}
                        </div>
                    </li>
 
                    
                );
                })}
            </ul>
    </Modal>       
    </>
    )
}