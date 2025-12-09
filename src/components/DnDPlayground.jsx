import { useState } from "react";
import {
    DndContext, // DndContext — это «комната, где можно тащить вещи». область перетаскивания
    closestCenter, //Он берёт центр перетаскиваемого элементаи находит элемент, чей центр ближе всего.
    PointerSensor,//«перетаскивание мышкой / пальцем»
    useSensor, //создаёт один сенсор. 
    useSensors, //объединяет несколько сенсоров в один набор и отдает в DndContext
} from "@dnd-kit/core";
import {
  SortableContext, //Это «контейнер сортируемого списка».
  useSortable,//Это хук, который делает конкретный элемент перетаскиваемым и сортируемым.
  verticalListSortingStrategy, //алгоритм сортировки
  arrayMove, //Это утилита, которая меняет местами элементы массива.
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Отдельный элемент списка, который можно перетаскивать
function SortableItem({ id, name }) { // это шото мы конструируем типа компоненнта внутри. кастомлейбл
    const {
        attributes, //Это ARIA-атрибуты (для доступности):
        listeners, //Это обработчики событий — мышь и тач. Они делают элемент "активируемым":
        setNodeRef, //Вот DOM-элемент, которым нужно управлять (двигать, анимировать, вычислять позицию)
        transform, //Это смещение элемента при перетаскивании:
        transition, //CSS-анимация
        isDragging, //«Этот элемент в данный момент тащат». Булевый флаг.
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "8px 12px",
        marginBottom: "6px",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
        background: isDragging ? "#fbbf24" : "#ffffff",
        cursor: "grab",
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
    };

    return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {name}
    </div>
    );
}

export default function DnDPlayground() {
     const [items, setItems] = useState([{id:1, name:"Label A"}, {id:2, name: "Label B"}, {id:3, name: "Label C"}, {id:4, name: "Label D"}]);
    //const [items, setItems] = useState(["Label A", "Label B", "Label C", "Label D"]);

  // Сенсоры — говорим: используем мышку (PointerSensor)
    const sensors = useSensors(
        useSensor(PointerSensor) //«Создать экземпляр PointerSensor со стандартными настройками».
    );

    function handleDragEnd(event) { // эту функцию выполним как только драг закочнен и был дроп
        const { active, over } = event; // это деструктуризация классического e. объекта 
    // Если отпустили не над другим элементом — ничего не делаем
        if (!over) return;

        if (active.id !== over.id) {
            setItems((prevItems) => { 
                const oldIndex = prevItems.findIndex((item) => item.id === active.id); // перед переиндекасацией сохраняем старый индекс перетаскиваемого элемента
                const newIndex = prevItems.findIndex((item) => item.id === over.id); // перед переиндекасацией будущий новый индекс перетаскиваемого элемента
                return arrayMove(prevItems, oldIndex, newIndex); // как-то под капотом тасуем
            });
        }
    }

    return (
        <div style={{ maxWidth: "320px", margin: "20px auto" }}>
            <h2 style={{ marginBottom: "12px", fontWeight: "600" }}>
                DnD Playground (лейблы)
            </h2>

            <DndContext // все что внутри будетв контексте перетяггивания или хз
                sensors={sensors} //передаем какие будут сенсоры
                collisionDetection={closestCenter} // передаем какой-то алгоритм
                onDragEnd={handleDragEnd} // по окнчанию перетягивания запустим эту функцию
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy} // наверное влияет просто на отображение сортировки и все.
                >
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} name={item.name} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
