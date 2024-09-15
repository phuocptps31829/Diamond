import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold2Fill } from "react-icons/ri";

const SidebarToggle = ({ isOpen, onToggleOpen }) => {
    console.log(isOpen);
    return (
        <div>
            { isOpen ? <RiMenuFoldFill
                className="cursor-pointer text-2xl"
                onClick={ () => onToggleOpen(!isOpen) }
            /> : <RiMenuFold2Fill
                className="cursor-pointer text-2xl"
                onClick={ () => onToggleOpen(!isOpen) }
            /> }
        </div>
    );
};

export default SidebarToggle;