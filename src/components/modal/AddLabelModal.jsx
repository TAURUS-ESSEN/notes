// import styles from './modal.module.css';
import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useState } from 'react';

export default function AddLabelsModal() {
    const {labels, setLabels, closeModal} = useAppContext()
    const [labelName, setLabelName] = useState('');
    const lenghtOK = labelName.length > 1;
    const [labelColor, setLabelColor] = useState('');


    function onSubmit(e) {
        e.preventDefault()
        setLabels(prev=> [...prev, { id: Date.now(), name: labelName, color: 'gray' }])
        setLabelName('');
        setLabelColor('');
        closeModal();
    }

    function cancel() {
        setLabelName('');
        setLabelColor('');
        closeModal();
    }
    
    return (
        <>
            <Modal title='Create new label' closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col gap-4 p-4' >
                    {/* <label>Enter category name:</label> */}
                    <input type='text' 
                        onChange={(e) => setLabelName(e.target.value.slice(0,35))} 
                        value={labelName}
                        // onBlur = {(e) => setCategoryName(e.target.value.trim())} 
                        maxLength={35}
                        autoFocus
                        className='border p-2' 
                        required
                        placeholder='Label Title, min 2 characters'
                    />
                    <div className='flex justify-between gap-4'>
                        <button type="button" onClick={cancel} className='border p-2'>Cancel</button>
                        <button type='submit' disabled={!lenghtOK} className='border p-2'>
                            +Add New Label
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}