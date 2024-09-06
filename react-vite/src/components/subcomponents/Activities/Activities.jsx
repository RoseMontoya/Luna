import { Icon } from "../";
// import { BsDot } from "react-icons/bs";
import "./Activities.css";

function Activities({ activities, icons, entryActs }) {
  const actsFiltered = entryActs.filter((act) => activities[act.activityId]);

  return (
    <>
      {actsFiltered.map((act, idx) => (
        <div key={act.activityId} className="activity">
          {/* {activities[act.activityId]? ( */}
          <>
            {/* <div className={`${idx === 0 || (!activities[entryActs[0].activityId] && idx === 1)? 'hidden': ""}`}>
                        <BsDot />
                    </div> */}
            <div className="icon">
              <Icon icons={icons} id={activities[act.activityId].iconId} />
            </div>
            <p>{activities[act.activityId].name}</p>
          </>
          {/* ): null} */}
        </div>
      ))}
    </>
  );
}

export default Activities;
