// React Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

// Components/Redux imports
import { Icon } from "../../subcomponents";
import { useModal } from "../../../context/Modal";
import { createActivity, editActivity } from "../../../redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditActivitiesModal from "./EditActvitiesModal";

function ActivityFormModal({ allIcons, icons, prevAct, source }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // useStates
  const [name, setName] = useState("" || prevAct?.name);
  const [iconId, setIconId] = useState("" || prevAct?.iconId);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Real time validations
    if (name?.length > 30) {
      // If name is longer than 30 character, slice off extra characters
      setName(name.slice(0, 31));
      setErrors({ name: "Activity name cannot be longer than 30 characters." });
    }

    // Remove errors if no longer applicable
    if (name?.length > 2 && name?.length < 30) {
      setErrors((prev) => {
        const { name, ...rest } = prev;
        return rest;
      });
    }

    if (iconId) {
      setErrors((prev) => {
        const { iconId, ...rest } = prev;
        return rest;
      });
    }
  }, [name, iconId]);

  // handle submit of new activity
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Frontend validations
    const errs = {};
    if (!name || name.length < 3 || name.length > 30)
      errs.name = "Activity name must be between 2-30 characters.";
    if (!iconId)
      errs.iconId = "Please chose an icon to represent this activity.";

    if (Object.values(errs).length) return setErrors(errs);

    // Check if there is a previous activity we are editing, and choose the appropriate thunk
    const thunk = prevAct ? editActivity : createActivity;

    dispatch(thunk({ name: name, iconId, id: prevAct?.id }))
      .then(closeModal)
      .catch(async (res) => {
        const errs = await res.json();
        setErrors(errs.errors);
      });
  };
  return (
    <div>
      {/* Cancel Button */}
      <OpenModalButton
        className="nav-buttons"
        buttonText="Cancel"
        modalComponent={
          source === "page" ? Navigate(-1) : <EditActivitiesModal />
        }
      />

        {/* Activity Form */}
      <form id="act-form" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Enter activity:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p className={`${errors.name ? "error" : "hidden-error"} `}>
          {errors.name}
        </p>
        <label>Choose an icon:</label>
        <div className="activity-icons">
          {icons.map((icon) => (
            <div
              key={icon.id}
              onClick={() => setIconId(icon.id)}
              className={`${
                icon.id === iconId ? "selectedAct" : ""
              } icon light-shadow`}
            >
              <Icon icons={allIcons} id={icon.id} />
            </div>
          ))}
        </div>
        <p className={`${errors.iconId ? "error" : "hidden-error"} `}>
          {errors.iconId}
        </p>
        <button className="submit-btn" type="submit">{`${
          prevAct ? "Update" : "Create"
        }`}</button>
      </form>
    </div>
  );
}

export default ActivityFormModal;
