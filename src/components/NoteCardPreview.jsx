import NoteLabelList from "./NoteLabelList";

export default function NoteCardPreview({ note, labels }) {
  return (
    <div className="notePreviewContainer">
      <div className="notePreview">
        <div className="line-clamp-2 font-semibold break-all text-(--title-card)">
          {note.title}
        </div>
        <div className="text-sm line-clamp-3 break-all text-(--text-card)">
          {note.text}
        </div>
      </div>

      <NoteLabelList labels={labels} note={note} />
    </div>
  );
}
