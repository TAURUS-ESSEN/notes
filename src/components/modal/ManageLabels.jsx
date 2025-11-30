import { useAppContext } from "../AppContext";
import { useState } from 'react';
import Modal from './Modal';

export default function ManageLabels() {
    const {closeModal, notes, setNotes, labels, setLabels } = useAppContext(); 
    const [editingId, setEditingId] = useState(null);   // id того, кто сейчас редактируется
    const [deleteId, setDeleteId] = useState(null);
    const [draft, setDraft] = useState("");             // временный текст для инпута


    function startEdit(label) {
        setEditingId(label.id);       // запоминаем, какой именно label редактируем
        setDraft(label.name);         // подставляем текущее имя в input
    }

    function saveEdit(id) {
        setLabels(prev =>
            prev.map(l => l.id === id ? { ...l, name: draft } : l)
        );
        setEditingId(null);           // выходим из режима редактирования
        setDraft("");
    }

    function deleteLabel(id) {
        setLabels(prev=>prev.filter(label=>label.id!==id));
        setNotes(prev=>prev.map(note=> {
        if (note.labels.includes(id)) {
            return {...note, labels: note.labels.filter(l=>l!==id)}
        }
        else return note
        }))
        setDeleteId(null);
    }

    return (
    <>
        <Modal title="Labels management" closeModal={closeModal}>
            <ul className="bg-gray-100 rounded-xl">
                {labels.map(label => {
                const isEditing = editingId === label.id;
                const isDeleting = deleteId === label.id;

                return (
                    <li key={label.id} className="min-w-100 flex flex-col ">
                        <div className="flex gap-2 items-center justify-between p-2 bg-amber-200 mb-2">
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
                                    <button onClick={() => startEdit(label)} className="btn">edit</button>
                                ) : (
                                    <button onClick={() => saveEdit(label.id)}>save</button>
                                )}
                                </span>
                            <button onClick={() => setDeleteId(label.id)} className="btn">delete</button>
                        </div>
                        <div className="p-2">
                            {isDeleting && (
                                <div className="flex flex-col justify-center gap-2">
                                    <span className="text-center">wish you realy delete this label? </span>
                                    {/* {notes.filter(note=>note.labels.includes(label.id)).length} */}
                                    <span className="text-center">Deleting this label will affect {notes.filter(note => Array.isArray(note.labels) && note.labels.includes(label.id)).length} notes.</span>
                                    
                                    <span className="flex justify-around">
                                        <button className="btn cancel" onClick={()=>{setDeleteId(null)}}>Cancel</button>
                                        <button className="btn" onClick={()=>deleteLabel(label.id)}>Delete</button>
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