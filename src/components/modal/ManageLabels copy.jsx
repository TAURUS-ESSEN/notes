import { useAppContext } from "../AppContext";
import { useState } from 'react';
import Modal from './Modal';

export default function ManageLabels() {
    const { openModal, closeModal, labels, setLabels } = useAppContext(); 
    const [isEditing, setIsEditing] = useState(false); 
    return (
    <>
        <Modal title={`Labels management:`} closeModal={closeModal}>
            <ul className="flex flex-col p-4">
                {labels.map(label=>{
                    return (
                        <li className="flex justify-between border-b p-1">
                            <div>
                                <span>{label.name}</span>
                                <button className="border" onClick={()=>{}}>edit</button>
                            </div>
                            <button className="border" onClick={()=>{}}>delete</button>
                        </li>
                        )
                })}
            </ul>

            <div className='flex  justify-between gap-4'>
                    <button type="button" onClick={closeModal} className='border  p-2'>Cancel</button>
                    <button type='submit' className='border p-2' onClick={()=>openModal('addLabel')}>
                        Add New Label
                    </button>  
            </div>
            </Modal>        
    </>
    )
}