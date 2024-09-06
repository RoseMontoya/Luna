import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteEntry } from "../../../redux/entries";
import "./DeleteEntry.css";

function DeleteEntryModal({ entry, entries }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteEntry(entry.id)).then(() => {
      closeModal();
      if (entries.length <= 1) navigate("/");
      else navigate("/entries");
    });
  };

  return (
    <div id="entry-delete">
      <h2>Delete loving memory?</h2>
      <p>
        This is your life we are talking about. Do you want to delete a part of
        it?
      </p>
      <div id="act-delete-btns">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteEntryModal;
