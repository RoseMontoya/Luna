import { useEffect, useRef, useState } from "react";
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
  const isSelelcted = level.id === selected;

  // refs for inputs to enable and disable on clicks
  const inputRef = useRef(null);
  const editBtnRef = useRef(null);

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

  // * Trying to get level input to be disabled when you click off of it
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     // console.log('target', e.target.contains('level-input'), 'Input current', inputRef.current, '...', !inputRef.current.contains(e.target),  'Edit current', editBtnRef.current, '...', editBtnRef.current.contains(e.target), 'res', inputRef.current &&
  //     // !inputRef.current.contains(e.target) &&
  //     // !editBtnRef.current.contains(e.target))
  //     // if (inputRef.current && !inputRef.current.contains(e.target) && !e.target === "<button className=\"hidden lvl-btns\">Edit</button>") {
  //     //     console.log('inside if statement')
  //     //     setSelected('')
  //     // }
  //     if (
  //       inputRef.current &&
  //       !inputRef.current.contains(e.target) &&
  //       !editBtnRef.current.contains(e.target)
  //     ) {
  //       setSelected("");
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [setSelected]);

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

  // const handleDelete = async() => {
  //     dispatch(deleteLevel(level.id))
  //         .then(() => {
  //             setSelected('')
  //             const newLvls = [...lvls]
  //             newLvls.splice(idx, 1)
  //             setLvls(newLvls)

  //         })
  // }

  // const lvlInput =

  return (
    <>
      <div className="lvl">
        <input
          // onClick={() => setSelected(level.id)}
          disabled={!isSelelcted}
          className="level-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter level"
          onClick={() => setSelected(level.id)}
          ref={inputRef}
        />
        <button
          ref={editBtnRef}
          onClick={handleEdit}
          className={`${isSelelcted ? "hidden" : ""} lvl-btns`}
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          className={`${isSelelcted ? "" : "hidden"} lvl-btns`}
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
