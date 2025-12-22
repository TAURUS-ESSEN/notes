import NoteLabelList from "./NoteLabelList";
import { getFirstImageSrc } from "../../utils/notePreview";

function NotePreview({ note }) {
  const imgSrc = getFirstImageSrc(note?.content);

  return (
    <>
      {imgSrc ? (
        <div className="noteMedia hasImage">
          <img src={imgSrc} alt="" />
        </div>
      ) : null}

      <div className={`noteTextPreview ${imgSrc ? 'line-clamp-3' : 'line-clamp-9'} `}>
        {note.text || "(Empty note)"}
      </div>
    </>
  );
}

export default function NoteCardPreview({ note, labels }) {
  


  return (
    <div className="notePreviewContainer">
      <div className="notePreview">
        <div className="line-clamp-2 font-semibold break-all text-(--title-card)">
          {note.title}
        </div>
        <div className="text-sm line-clamp-3 break-all text-(--text-card)">
          {note.text}
          {/* <NotePreview note={note} /> */}
        </div>
      </div>

      <NoteLabelList labels={labels} note={note} />
    </div>
  );
}
