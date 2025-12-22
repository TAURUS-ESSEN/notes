import { useDraggable } from "@dnd-kit/core";
import { getFirstImageSrc } from "../../utils/notePreview";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import NoteCardButtons from "./NoteCardButtons";
import NoteLabelList from "./NoteLabelList";

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

export default function NoteCard({ note, labels, undo }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `note-${note.id}`,
      data: { type: "note", noteId: note.id, fromStatus: note.status },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="notePreviewContainer group w-[300px] md:w-[235px] lg:w-[245px] xl:w-[300px]">
      <div className="flex justify-between items-center group">
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="hitbox cursor-grab"
          aria-label="Drag note"
          title="Drag"
        >
          <FontAwesomeIcon icon={faGrip} className="text-xs text-gray-300 mr-4" />
        </button>
          <NoteCardButtons note={note} undo={undo} />
      </div>

      <Link
        to={`/edit/${note.id}`}
        title="Click to edit this note"
        className="flex flex-1"
      >
        <div className="notePreview w-full">
          <div className="line-clamp-2 font-semibold text-(--title-card)">
            {note.title}
          </div>

          <NotePreview note={note} />
        </div>
      </Link>

      <NoteLabelList labels={labels} note={note} />
    </div>
  );
}
