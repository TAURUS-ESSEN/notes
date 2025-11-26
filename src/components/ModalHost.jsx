import AddNoteModal from "./AddNoteModal";
// import ShowCategoriesModal from "./ShowCategoriesModal"
// import TaskModal from './TaskModal'
// import ShowTagsModal from "../Tags/ShowTagsModal"
import { useAppContext } from "./AppContext";

export default function ModalHost() {
    const {modal} = useAppContext()
    
    switch (modal.type) {
            case 'addNote':
                return <AddNoteModal />    
            // case 'addCategory':
            //     return <AddCategoryModal/>
            // case 'showCategories':
            //     return <ShowCategoriesModal/>
            // case 'showTags':
            //     return <ShowTagsModal/>
            default:
                return null;
        }
    
}