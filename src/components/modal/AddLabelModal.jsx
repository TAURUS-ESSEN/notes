import Modal from './Modal';
import { useAppContext } from '../AppContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark} from '@fortawesome/free-regular-svg-icons';
import ColorPicker from '../ColorPicker.jsx';

export default function AddLabelsModal() {
    const {labels, setLabels, closeModal, setToasts} = useAppContext()
    const [labelName, setLabelName] = useState('');
    const isTitleValid = labelName.length > 1;
    const [labelColor, setLabelColor] = useState('amber');
    const [error, setError] = useState('');
    const isDuplicate = labels.some(
        label => label.name.trim().toLowerCase() === labelName.trim().toLowerCase()
    );


    const onSubmit = (e) => {
        e.preventDefault()

        if (isDuplicate) {
            setError('Label with this name already exists');
            return;
        }

        setLabels(prev=> [...prev, { id: Date.now(), name: labelName.trim(), color: labelColor}])
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <FontAwesomeIcon icon={faBookmark} className='block' /> <span> Label <strong>" {labelName}"</strong>created</span>
            </div>
            )}])) 
        setLabelName('');
        setError('')
        setLabelColor('');
        closeModal();
    }

    const cancel = () => {
        setLabelName('');
        
        setLabelColor('');
        closeModal();
    }
    
    return (
        <>
            <Modal title='Create new label' closeModal={closeModal}>
                <form onSubmit={onSubmit} className='bg-white flex flex-col gap-4 p-4 rounded-xl' >
                    <input type='text' 
                        onChange={(e) => {
                            setLabelName(e.target.value.slice(0,25));
                            if (error) setError('');
                        }}
                        value={labelName}
                        maxLength={35}
                        autoFocus
                        className='border p-2' 
                        required
                        placeholder='Label Title, min 2 characters'
                    />
                    <div className='flex justify-center items-center mt-1 '>
                        <ColorPicker labelColor={labelColor} setLabelColor={setLabelColor}/>
                    </div>
                    <span>{error}</span>
                    <div className='flex justify-between gap-4'>
                        <button type="button" onClick={cancel} className='btn border p-2 '>Cancel</button>
                        <button type='submit' disabled={!isTitleValid || isDuplicate} className='btn apply border p-2'>
                            +Add New Label
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}