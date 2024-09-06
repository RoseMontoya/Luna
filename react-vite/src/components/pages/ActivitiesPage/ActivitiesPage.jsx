// React Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component/Redux Imports
import { getAllActivities, getAllIcons } from "../../../redux";
import { Icon, Loading } from "../../subcomponents";
import {
  ActivityFormModal,
  OpenModalButton,
  DeleteActivityModal,
} from "../../modals";
import { useNav } from "../../../context/navContext";

function ActivitiesPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { navOpen } = useNav();

  const allIcons = useSelector((state) => state.icons.allIcons);
  const icons = allIcons ? Object.values(allIcons) : [];
  const actsObj = useSelector((state) => state.activities.allActivities);
  const activities = actsObj ? Object.values(actsObj) : [];

  useEffect(() => {
    if (!actsObj) {
      dispatch(getAllActivities());
    }
    if (!allIcons) {
      dispatch(getAllIcons());
    }
  }, [dispatch, actsObj, allIcons]);

  if (!user) return <Navigate to="/" replace={true} />;
  if (!actsObj || !allIcons) return <Loading />;

  return (
    <main className={`${navOpen ? "nav-open" : ""}`}>
      <h1>Activities:</h1>
      <div className="entries-container">
        <div className="container">
          <div id="act-head" className="border-bottom">
            <div onClick={(e) => e.preventDefault()}>
              <OpenModalButton
                className="add-act-btn"
                buttonText="Add"
                modalComponent={
                  <ActivityFormModal
                    source="page"
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
              <div key={activity.id} className="act-container">
                <div className="activity">
                  <div className="icon">
                    <Icon icons={allIcons} id={activity.iconId} />
                  </div>
                  <p>{activity.name}</p>
                </div>
                <div className="act-btns">
                  <OpenModalButton
                    buttonText="Edit"
                    modalComponent={
                      <ActivityFormModal
                        source="page"
                        activities={activities}
                        allIcons={allIcons}
                        icons={icons}
                        prevAct={activity}
                      />
                    }
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteActivityModal activity={activity} source="page" />
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ActivitiesPage;
