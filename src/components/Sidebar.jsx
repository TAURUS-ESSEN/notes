import { Link } from "react-router-dom"
export default function Sidebar() {
    return (
        <div className="bg-amber-200 p-4 flex flex-col items-start gap-6 min-w-60">
            <div>
                <ul className="flex flex-col justify-start items-start">
                    <li><Link to='/'>Notes</Link></li>
                    <li><Link to='archive'>Archive</Link></li>
                    <li><Link to='trash'>Trash</Link></li>
                </ul>
            </div>
            <div>
                <h2 className="text-gray-600 text-left">Labels</h2>
                <ul className="flex flex-col justify-start items-start">
                    <li>Productivity</li>
                    <li>To buy</li>
                    <li>Job</li>
                    <li>Calls</li>
                </ul>
            </div>
            <div><button>New Label</button></div>
        </div>
    )
}