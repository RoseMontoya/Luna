import { Icon } from "../../subcomponents";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ActivityFormModal from "./ActivityFormModal";
import './ActivityModal.css'
import DeleteActivityModal from "./DeleteActivityModal";
import { useSelector } from "react-redux";

function EditActivitiesModal() {
    const allIcons = useSelector(state => state.icons.allIcons)
    const icons = allIcons? Object.values(allIcons) : []
    const actsObj = useSelector(state => state.activities.allActivities)
    const activities = actsObj? Object.values(actsObj) : []

  return (
    <div>
      <h2>Activities:</h2>
      <div onClick={(e) => e.preventDefault()}>
        <OpenModalButton
          buttonText="Add"
          modalComponent={
            <ActivityFormModal activities={activities} allIcons={allIcons} icons={icons} />
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
            <ActivityFormModal activities={activities} allIcons={allIcons} icons={icons} prevAct={activity}/>
          }
        />
             <OpenModalButton
          buttonText="Delete"
          modalComponent={
            <DeleteActivityModal activity={activity}/>
          }
        />
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
