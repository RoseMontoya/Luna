import { useModal } from "../../../context/Modal";
import { Icon } from "../../subcomponents";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ActivityFormModal from "./ActivityFormModal";
import "./ActivityModal.css";
import DeleteActivityModal from "./DeleteActivityModal";
import { useSelector } from "react-redux";

function EditActivitiesModal() {
  const { closeModal } = useModal()
  const allIcons = useSelector((state) => state.icons.allIcons);
  const icons = allIcons ? Object.values(allIcons) : [];
  const actsObj = useSelector((state) => state.activities.allActivities);
  const activities = actsObj ? Object.values(actsObj) : [];

  return (
    <div>
      <p className="nav-buttons" onClick={() => closeModal()}>Close</p>
      <div style={{padding: '.25em 1em'}}>
        <div id="act-head" className="border-bottom">
          <h2>Activities:</h2>
          <div onClick={(e) => e.preventDefault()}>
            <OpenModalButton
              className="add-act-btn"
              buttonText="Add"
              modalComponent={
                <ActivityFormModal
                  activities={activities}
                  allIcons={allIcons}
                  icons={icons}
                />
              }
            />
          </div>
        </div>
        <div className="activities">
          {activities.map((activity) => (
            <div key={activity.id} style={{border: '1px solid black', padding: '.5em', borderRadius: '1em'}} >
              <div className="activity">
                <div className="icon">
                  <Icon icons={allIcons} id={activity.iconId} />
                </div>
                <p>{activity.name}</p>
              </div>
              <div className='act-btns'>
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={
                    <ActivityFormModal
                      activities={activities}
                      allIcons={allIcons}
                      icons={icons}
                      prevAct={activity}
                    />
                  }
                />
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteActivityModal activity={activity} />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditActivitiesModal;
