import { pickImageFile, uploadImage } from "../utils/imageAdapter";

const TOOLS = [
  { key: "bold",   label: "B",  title: "Bold",   isActive: (e) => e.isActive("bold"),   can: (e) => e.can().chain().focus().toggleBold().run(),   run: (e) => e.chain().focus().toggleBold().run() },
  { key: "italic", label: "I",  title: "Italic", isActive: (e) => e.isActive("italic"), can: (e) => e.can().chain().focus().toggleItalic().run(), run: (e) => e.chain().focus().toggleItalic().run() },
  { key: "undo",   label: "↶",  title: "Undo",   isActive: () => false,                 can: (e) => e.can().chain().focus().undo().run(),         run: (e) => e.chain().focus().undo().run() },
  { key: "redo",   label: "↷",  title: "Redo",   isActive: () => false,                 can: (e) => e.can().chain().focus().redo().run(),         run: (e) => e.chain().focus().redo().run() },
  {
  key: "image",
  label: "🖼",
  title: "Insert image",
  isActive: () => false,
  can: () => true,
  run: async (editor) => {
    try {
      const file = await pickImageFile();
      if (!file) return;
      const src = await uploadImage(file);
      editor.chain().focus().setImage({ src }).run();
    } catch (e) {
      alert(e.message || "Image error");
    }
  },
},
];

function ToolBtn({ editor, tool }) {
  const base =
    "editorBtn !min-h-10 px-3 py-2 rounded-xl border shadow hover:scale-105 duration-200 disabled:opacity-40 disabled:hover:scale-100";
  const active = tool.isActive(editor) ? "bg-amber-400 text-white" : "";

  return (
    <button
      type="button"
      className={`${base} ${active}`}
      onClick={() => tool.run(editor)}
      disabled={!tool.can(editor)}
      title={tool.title}
      aria-label={tool.title}
    >
      {tool.label}
    </button>
  );
}

export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center mb-2">
      {TOOLS.map((tool) => (
        <ToolBtn key={tool.key} editor={editor} tool={tool} />
      ))}
    </div>
  );
}
