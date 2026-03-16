import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import GreenCheckmark from "./greenCheckmark";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }:
  {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
  }
) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <BsPlus className="fs-4" />
      <BsThreeDotsVertical className="fs-4" />
    </div>
  );
}