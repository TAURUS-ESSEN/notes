import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
export default function ErrorPage() {
    const navigate = useNavigate()
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate('/');
        }, 3000)
        return () => clearTimeout(timer)
    },[navigate])

    return (
        <h1 className="text-2xl">
        Page not found. Redirecting to the homepage in a few seconds… 
        </h1>
    )
}