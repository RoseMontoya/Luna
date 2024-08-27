import { useDispatch } from "react-redux"
import EditActivitiesModal from "./EditActvitiesModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { deleteActivity } from "../../../redux/activities"
import { Navigate } from "react-router-dom"
import { useModal } from "../../../context/Modal"

function DeleteActivityModal({activity}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = () => {
        dispatch(deleteActivity(activity.id))
            .then(() => {
                console.log("here")
                closeModal()
            })
    }

    return (
        <div>
            <h2>Delete &quot;{activity.name}&quot;?</h2>
            <p>Deleting &quot;{activity.name}&quot; will remove it form all of your precious entries. You can also edit it. Do you still want to mercilessly delete &quot;{activity.name}&quot;?</p>
            <button onClick={handleDelete}>Delete</button>
            <OpenModalButton
                buttonText="Cancel"
                modalComponent={<EditActivitiesModal />}
              />
        </div>
    )
}

export default DeleteActivityModal
