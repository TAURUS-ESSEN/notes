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
                <div className="flex flex-col rounded-xl gap-4 bg-white test2">
                    <div className='flex justify-between gap-4 items-center p-4 bg-gray-50 rounded-t-xl border-gray-300 text-gray-600 border-b text-lg'>
                        <h3 className={styles.modalTitle}>{title}</h3>
                        <button onClick={()=>closeModal()} className='text-2xl hover:scale-115 duration-300' >&times;</button>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </>
    , modalRoot)
}