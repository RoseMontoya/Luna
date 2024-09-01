import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllActivities } from "../../../redux/activities"
import { getAllIcons } from "../../../redux/icons"
import { Navigate } from "react-router-dom"
import { Icon, Loading } from "../../subcomponents"
import OpenModalButton from "../../modals/OpenModalButton/OpenModalButton"
import { ActivityFormModal } from "../../modals"
import DeleteActivityModal from "../../modals/ActivityModal/DeleteActivityModal"

function ActivitiesPage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allIcons = useSelector((state) => state.icons.allIcons);
  const icons = allIcons ? Object.values(allIcons) : [];
  const actsObj = useSelector((state) => state.activities.allActivities);
  const activities = actsObj ? Object.values(actsObj) : [];

    useEffect(() => {
        if (!actsObj) {
            dispatch(getAllActivities())
        }
        if (!allIcons) {
            dispatch(getAllIcons())
        }
    }, [dispatch, actsObj, allIcons])


    if (!user) return <Navigate to="/" replace={true} />;
    if (!actsObj || !allIcons) return <Loading />

    return (
        <main className={`nav-open`}>
          <h1>Activities:</h1>
            <div className="container">
            <div style={{padding: '.25em 1em'}}>
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
                    source='page'
                      activities={activities}
                      allIcons={allIcons}
                      icons={icons}
                      prevAct={activity}
                    />
                  }
                />
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteActivityModal activity={activity} source='page'/>}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
            </div>
        </main>
    )

}

export default ActivitiesPage
