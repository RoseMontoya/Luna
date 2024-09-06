import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../../context/Modal";
import LevelEditModal from "./LevelEditModal";
import { deleteLevel } from "../../../redux/levels";

function DeleteLevelModal({
  levelsObj,
  level,
  lvls,
  setLvls,
  setSelected,
  idx,
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteLevel(level.id)).then(() => {
      setSelected("");
      const newLvls = [...lvls];
      newLvls.splice(idx, 1);
      setLvls(newLvls);
      closeModal();
    });
  };

  return (
    <div id="act-delete-modal">
      <h2>Delete &quot;{level.name}&quot;?</h2>
      <p>
        Deleting &quot;{level.name}&quot; will remove it form all of your
        precious entries. Do you still want to mercilessly delete &quot;
        {level.name}&quot;?
      </p>
      <div id="act-delete-btns">
        <button onClick={handleDelete}>Delete</button>
        <OpenModalButton
          buttonText="Cancel"
          modalComponent={<LevelEditModal levelsObj={levelsObj} />}
        />
      </div>
    </div>
  );
}

export default DeleteLevelModal;
