import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./greenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" />
    </div>
  );
}