// React Imports
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
// Component/Redux imports
import EditActivitiesModal from "./EditActvitiesModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { deleteActivity } from "../../../redux";
import { useModal } from "../../../context/Modal";

import("./ActivityModal.css");

function DeleteActivityModal({ activity, acts, setActs, source }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteActivity(activity.id)).then(() => {
      if (acts && acts.has(activity.id)) {
        const actsCopy = new Set(acts);
        actsCopy.delete(activity.id);
        setActs(actsCopy);
      }
      closeModal();
    });
  };

  return (
    <div id="act-delete-modal">
      <h2>Delete &quot;{activity.name}&quot;?</h2>
      <p>
        Deleting &quot;{activity.name}&quot; will remove it form all of your
        precious entries. Do you still want to mercilessly delete &quot;
        {activity.name}&quot;?
      </p>
      <div id="act-delete-btns">
        <button onClick={handleDelete}>Delete</button>
        <OpenModalButton
          buttonText="Cancel"
          modalComponent={
            source === "page" ? Navigate(-1) : <EditActivitiesModal />
          }
        />
      </div>
    </div>
  );
}

export default DeleteActivityModal;
