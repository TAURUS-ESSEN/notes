import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { LABEL_COLOR_CLASSES_TEXT } from "../constants/labelColors";

function SortableLabel({ id, name, color, isActive, onToggle }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
  transform: CSS.Transform.toString(transform),
  transition: isDragging
    ? "transform 40ms linear"
    : "transform 250ms ease",
};

    return (
        <li
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`menuLinks ${isActive ? "bg-green-100" : ""}`}
        >
            <FontAwesomeIcon
                icon={faBookmark}
                className={`${LABEL_COLOR_CLASSES_TEXT[color]} text-base opacity-75`}
            />

            <button
                onClick={() => onToggle(id)}
                className="text-left truncate max-w-[180px] text-(--labelLink)"
                title={`show notes with label ${name}`}
            >
                {name}
            </button>
        </li>
    );
}

export default function LabelsList({ labels, filter, onToggle, onSort }) {
    const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // ← пока не двинул — это клик, а не drag
    },
  })
);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = labels.findIndex((l) => l.id === active.id);
        const newIndex = labels.findIndex((l) => l.id === over.id);

        const sorted = arrayMove(labels, oldIndex, newIndex);
        onSort(sorted); // << передаём наружу новый порядок
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={labels.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul className="flex flex-col justify-start items-start w-full gap-1">
                    {labels.map((label) => (
                        <SortableLabel
                            key={label.id}
                            id={label.id}
                            name={label.name}
                            color={label.color}
                            isActive={filter.includes(label.id)}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
}
