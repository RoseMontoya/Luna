import { Icon } from "../../subcomponents";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddActivityModal from "./AddActivityModal";
import './ActivityModal.css'

function EditActivitiesModal({ activities, allIcons, icons }) {
  return (
    <div>
      <h2>Activities:</h2>
      <div onClick={(e) => e.preventDefault()}>
        <OpenModalButton
          buttonText="Add"
          modalComponent={
            <AddActivityModal activities={activities} allIcons={allIcons} icons={icons} />
          }
        />
      </div>
      <div className="activities">

          {activities.map((activity) => (
            <div key={activity.id} className="activity">
                <div className={`focused`}>
                <OpenModalButton
          buttonText="Edit"
          modalComponent={
            <AddActivityModal activities={activities} allIcons={allIcons} icons={icons} prevAct={activity}/>
          }
        />
                    <p>Delete</p>
                </div>
              <div>
                <Icon icons={allIcons} id={activity.iconId} />
              </div>
              <p>{activity.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EditActivitiesModal;
