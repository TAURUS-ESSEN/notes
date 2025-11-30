import { createPortal } from "react-dom";
import  styles  from './toast.module.css';
import {useEffect} from 'react';

export default function Toast({toasts, setToasts}) {
    const toastRoot = document.getElementById('root-toast')
    useEffect(() => {
        if (toasts.length === 0) return
        const timer = setTimeout(() => {
            setToasts(prev => prev.slice(1));
        }, 5000);
        return () => clearTimeout(timer)
    }, [toasts])
    
    return createPortal(
        <>  
            {toasts.length > 0 && (
                <div id='toastContainer' className={`${styles.stack} ${toasts.length > 0 ? styles.show : ''}`}>
                {toasts.map((t) => (
                    <div className={styles.toast} key={t.toastId}>
                        {t?.message ?? t}
                    </div>
                ))}
                </div>
            )}
        </>
    , toastRoot)
}