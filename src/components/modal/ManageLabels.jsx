import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useAppContext } from "../AppContext";
import { useState, useCallback } from 'react';
import Modal from './Modal';

import SortedLabelRow from './SortedLabelRow.jsx'

export default function ManageLabels() {
    const {closeModal, labels, setLabels, setToasts } = useAppContext(); 
    const [labelColor, setLabelColor] = useState('amber');
    const [editingId, setEditingId] = useState(null); 
    const [deleteId, setDeleteId] = useState(null);
    const [draft, setDraft] = useState("");

    function startEdit(label) {
        setEditingId(label.id); 
        setDraft(label.name); 
        setLabelColor(label.color);
    }

    function saveEdit(label) {
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast break-all'>
                <span> Label <strong>"{label.name}"</strong> renamed to "{draft}" </span>
            </div>
            )}])) 
        setLabels(prev =>
            prev.map(l => l.id === label.id ? { ...l, color:labelColor, name: draft } : l)
        );
        setEditingId(null);
        setDraft("");
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setLabels((prev) => {
            const oldIndex = prev.findIndex((l) => l.id === active.id);
            const newIndex = prev.findIndex((l) => l.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    },[setLabels])

    return (
    <>
        <Modal title="Labels management" closeModal={closeModal}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={labels.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                >
            <div className=" rounded-xl mb-4 px-4">
                <ul className="border border-gray-200 rounded-xl overflow-hidden ">
                    {labels.map(label => {
                        const isEditing = editingId === label.id;
                        const isDeleting = deleteId === label.id;

                    return (
                        <SortedLabelRow 
                            key={label.id} 
                            label={label} 
                            isEditing={isEditing} 
                            draft={draft} 
                            setDraft={setDraft} 
                            startEdit={startEdit} 
                            saveEdit={saveEdit} 
                            setDeleteId={setDeleteId} 
                            setLabelColor={setLabelColor} 
                            labelColor={labelColor} 
                            isDeleting={isDeleting} 
                        />
                    );
                })} </ul>     
            </div>
            </SortableContext>
        </DndContext>
    </Modal>       
    </>
    )
}