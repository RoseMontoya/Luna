import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createLevel, editLevel } from "../../../redux/levels";
import DeleteLevelModal from "./DeleteLevelModal";
import { OpenModalButton } from "../";

function LevelInput({
  level,
  levelsObj,
  idx,
  setSelected,
  selected,
  lvls,
  setLvls,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const [name, setName] = useState(level?.name || "");
  const isSelected = level.id === selected;

  useEffect(() => {
    if (name.length > 15) {
      // If name is longer than 15 characters, slice off extra characters
      setName(name.slice(0, 16));
      setError({ name: "Level name cannot be longer than 15 characters." });
    }

    // Remove errors that are no longer applicable
    if (name.length > 2 && name.length < 15) {
      setError({});
    }
  }, [name]);

  const handleEdit = () => {
    setSelected(level.id);
  };

  const handleSave = async () => {
    setError({});
    // Front end validations
    if (!name || name.length < 3 || name.length > 15) {
      return setError({ name: "Level name must between 2 and 15 characters." });
    }
    try {
      // Check if level has updatedAt key to see if it is a previously made entry that needs to be edited
      if (level.updatedAt) {
        await dispatch(editLevel({ ...level, name: name }));
      } else {
        await dispatch(createLevel({ name: name })).then(
          (res) => {
            // Replace placeholder id with actual id from backend
            const newLvls = [...lvls];
            newLvls.splice(idx, 1, res);
            setLvls(newLvls);
          }
        );
      }
      // Unselect current level from editing
      setSelected("");
    } catch (e) {
      const err = await e.json();
      setError(err.errors);
    }
  };

  const handleBlur = () => {
    setSelected("")
  }

  return (
    <>
      <div className="lvl">
        <input
          disabled={!isSelected}
          className="level-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          placeholder="Please enter level"
          onClick={() => setSelected(level.id)}
        />
        <button
          onClick={handleEdit}
          className={`${isSelected ? "hidden" : ""} lvl-btns`}
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          className={`${isSelected ? "" : "hidden"} lvl-btns`}
        >
          Save
        </button>
        <OpenModalButton
          buttonText="Delete"
          modalComponent={
            <DeleteLevelModal
              idx={idx}
              level={level}
              lvls={lvls}
              setLvls={setLvls}
              setSelected={setSelected}
              levelsObj={levelsObj}
            />
          }
        />
      </div>
      <p className={`${error.name ? "error" : "hidden-error"} `}>
        {error.name}
      </p>
    </>
  );
}

export default LevelInput;
