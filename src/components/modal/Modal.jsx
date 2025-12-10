import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import styles from './modal.module.css'


export default function Modal({title, children, closeModal}) {
    const modalRoot = document.getElementById('root-modal')

    useEffect(()=>{
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {if (e.key === 'Escape') closeModal() }
        document.addEventListener("keydown", onKey)
        return () => {document.body.style.overflow = prev; document.removeEventListener("keydown", onKey)}
    },[closeModal])

    return createPortal(
        <>
            <div className={styles.modalOverlay} onClick={(e)=> {e.currentTarget === e.target && closeModal()}}>
                <div className="modal flex flex-col rounded-xl gap-4 bg-(--bg-modal) text-(--text-default)">
                    <div className='flex justify-between gap-4 items-center p-4 px-6 text-lg'>
                        <h3 className='text-(--headerTitle)'>{title}</h3>
                        <button 
                            onClick={()=>closeModal()} 
                            className='text-2xl hover:scale-115 duration-300 text-(--text-default) hover:text-amber-500'
                            title="Close window "
                        >
                            &times;
                        </button>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </>
    , modalRoot)
}