import AddNoteModal from "./AddNoteModal";
import AddLabelModal from "./AddLabelModal";
import DeleteNoteModal from './DeleteNoteModal';
import ManageLabels from './ManageLabels';
import { useAppContext } from "../AppContext";

export default function ModalHost() {
    const {modal} = useAppContext()
    
    switch (modal.type) {
            case 'addNote':
                return <AddNoteModal />
            case 'deleteNote':
                return <DeleteNoteModal />
            case 'addLabel':
                return <AddLabelModal />
            case 'manageLabels':
                return <ManageLabels />
            default:
                return null;
        }
    
}