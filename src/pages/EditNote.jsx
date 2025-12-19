import { useEditor, EditorContent } from "@tiptap/react";
import Image from "@tiptap/extension-image"
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import EditorToolbar from "../components/EditorToolbar";

export default function EditNote() {
    const { noteId} = useParams();
    const id = Number(noteId);
    const navigate = useNavigate();
    const {labels, notes, setNotes, setToasts, openModal} = useAppContext();
    const note = notes.find(n=>n.id === id) ?? null;;
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const initialContent =
    note?.content && note.content.type === "doc"
        ? note.content
        : {
            type: "doc",
            content: [
            {
                type: "paragraph",
                content: note?.text
                ? [{ type: "text", text: note.text }]
                : [],
            },
            ],
        };

    const [content, setContent] = useState(initialContent);
    const [pin, setPin] = useState(note.pinned);
    const [editLabels, setEditLabels] = useState(note.labels);

    const editor = useEditor({
        extensions: [StarterKit, Image],
        content,
        editable: note.status !== "deleted",
        onUpdate: ({ editor }) => {
            setContent(editor.getJSON()); 
            setText(editor.getText());
        },
    });

    const onSubmit = (e) => {
        e.preventDefault()
        const html = editor?.getHTML() ?? "";
        const plain = editor?.getText() ?? text;
        const json = editor?.getJSON() ?? content;

        setNotes(prev=>prev.map(n => n.id === id ? {...n, title: title, content: json, previewHtml: html, text: plain, labels: editLabels, pinned:pin, updatedAt: Date.now()}: n));
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <span> Note {title} was updated</span>
            </div>
        )}])) 
        navigate(-1);
    }

    const restore = () => {
        setNotes(prev=>prev.map(n => n.id === id ?  {...n, status: 'active', deletedAt: null} : n))
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='activeToast'>
                <span> Note {title} was restored</span>
            </div>
        )}])) 
    }

    const archive = () => {
        setNotes(prev=>prev.map(n => n.id === id ?  {...n, status: 'archived', pinned: false} : n))
        setPin(false);
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='archiveToast'>
                <span> Note {title} was archived</span>
            </div>
        )}])) 
    }

    const toTrash = () => {
        setNotes(prev=>prev.map(n => n.id === id ?  {...n, status: 'deleted', pinned: false, deletedAt: Date.now()} : n))
        setPin(false);
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <div className='deletedToast'>
                <span> Note {title} was deleted</span>
            </div>
        )}])) 
    }

    const deleteNote = (id) => {
        openModal('deleteNote', Number(id))
    }

    const toggleLabels = (id) => {
        setEditLabels(prev => prev.includes(id) ? prev.filter(l=>l!==id) : [...prev, id] )
    }

    useEffect(()=> {
        const onKey = (e) => {
            if (e.altKey && e.key.toLowerCase() === "s") { onSubmit(e) }
            if ((e.altKey && e.key.toLowerCase() === "a") && (note.status!=='archived'))  { archive() }
            if ((e.altKey && e.key.toLowerCase() === "w") && (note.status!=='active'))  { restore() }
            if ((e.altKey && e.key.toLowerCase() === "d") && (note.status!=='deleted'))  { toTrash()}
            if ((e.altKey && e.shiftKey && e.key.toLowerCase() === "d") && (note.status==='deleted'))  { deleteNote(id)}
            if (e.key === "Escape")  { navigate(-1) }
        }
        document.addEventListener("keydown", onKey)
        return () => {document.removeEventListener("keydown", onKey)}
    },[note.status, navigate])
    
    useEffect(() => {
        if (!editor) return;
        editor.setEditable(note.status !== 'deleted');
    }, [editor, note.status]);

    return (
        <div key={id} className='px-4'> 
            <form onSubmit={onSubmit} className='max-w-3xl m-auto mt-4 p-6 flex flex-col gap-4 border border-(--border-color) rounded-xl bg-(--bg-card) text-(--text-default) shadow-soft '>
                <input 
                    type='text' 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    disabled={note.status === 'deleted'}
                />
                {note.status === 'active' && 
                <div className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faThumbTack} className={`${pin === true ? 'text-(--text-pinned)': 'text-(--text-notpinned)' } text-sm`}/> 
                    <input 
                        type='checkbox' 
                        onChange={(e)=> e.target.checked === true ? setPin(true) : setPin (false)} 
                        checked={pin}
                    /> 
                        Pinned 
                </div>}
                <EditorToolbar editor={note.status === 'deleted' ? null : editor} />
                <div className={`border rounded-xl p-3  text-left ${note.status === 'deleted' ? 'opacity-60 pointer-events-none' : ''}`}>
                    <EditorContent editor={editor}  />
                </div>

                <div className='flex gap-1 text-lg flex-wrap'>
                    <span className='mr-1 text-gray-600'>Labels:</span> 
                    {labels.map(label => (
                        <label
                            key={label.id}
                            className="inline-flex items-center gap-1 px-1 py-0.5 cursor-pointer text-base "
                        >
                            <input
                            type="checkbox"
                            checked={editLabels.includes(label.id)}
                            onChange={() => toggleLabels(label.id)}
                            className="form-checkbox h-4 w-4 align-middle"
                            disabled={note.status === 'deleted'}
                            />
                            <span className="leading-none">
                            {label.name.length > 15 ? label.name.slice(0, 15) + '...' : label.name}
                            </span>
                        </label>
                        ))}
                </div>
                
                <div className='flex justify-around gap-20 mt-6 mb-4'>
                    <button 
                        type='button' 
                        className='btn relative group hover:bg-gray-200 ' 
                        onClick={()=>navigate(-1)} 
                        title="Cancel editing"
                    > 
                        Cancel <span className="hotkey ">(Esc)</span>
                    </button>

                    {(note.status === 'deleted' || note.status === 'archived') &&
                    <button 
                        type='button' 
                        className='btn group hover:bg-green-600 hover:text-white' 
                        onClick={restore} 
                        title="Restore note"
                    > 
                        Restore
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+W)
                        </span>
                    </button>}

                    { note.status !== 'archived' && note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        className='btn hover:bg-amber-300' 
                        onClick={archive} 
                        title="Archive note">  
                        Archive <span className="hotkey">(Alt+A)</span>
                    </button>}

                    { note.status !== 'deleted' &&
                    <button 
                        type='button' 
                        onClick={toTrash}
                        className='btn group hover:bg-red-500 hover:text-white' 
                        title="Delete note"
                    >
                        Delete 
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-white ">
                            (Alt+D)
                        </span>
                    </button>}
                    
                    { note.status === 'deleted' &&
                    <button 
                        type='button' 
                        className='btn group bg-red-600 text-white' 
                        onClick={()=>deleteNote(id)} 
                        title="Delete forever"
                    > 
                        <div className="flex flex-col items-center leading-tight">
                            <span className="text-base font-medium">Delete forever</span>
                            <span className="text-xs opacity-70">(Alt+Shift+D)</span>
                        </div>
                    </button>}
                    
                    { note.status !== 'deleted' &&
                        <button 
                            type='submit' 
                            className='btn apply' 
                            title="Save changes (Alt+S)"
                        >
                            Update <span className=" text-xs ml-1 text-white">(Alt+S)</span>
                        </button>}
                </div>
            </form>
        </div>
    );
}
