import {useState } from "react"
import { useDispatch} from "react-redux"
import { Icon } from "../../subcomponents"
import { useModal } from "../../../context/Modal"
import { createActivity, editActivity } from "../../../redux/activities"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import EditActivitiesModal from "./EditActvitiesModal"

function ActivityFormModal({ allIcons, icons, prevAct }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log("previous act", prevAct)

    const [name, setName] = useState('' || prevAct?.name)
    const [iconId, setIconId] = useState('' || prevAct?.iconId)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors({})

        const thunk = prevAct? editActivity : createActivity

        dispatch(thunk({name: name.toLowerCase(), iconId, id: prevAct?.id}))
            .then(closeModal)
            .catch(async (res) => {
                const errs = await res.json()
                setErrors(errs.errors)
            })
    }



    return (
    <div >
        {/* <button onClick={returnBack}>Back</button> */}
        <OpenModalButton
            className="nav-buttons"
                buttonText="Cancel"
                modalComponent={<EditActivitiesModal />}
              />
        <form id="act-form" onSubmit={(e) => handleSubmit(e)}>
            <label>Enter activity:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </label>
            <p className={`${errors.name? 'error': "hidden-error" } `}>{errors.name}</p>
            {/* {errors?.name && <p className="error">{errors.name}</p>} */}
            <label >Choose an icon:</label>
            <div className="activities">
                {icons.map(icon => (
                    <div key={icon.id} onClick={() => setIconId(icon.id)}
                    className={`${ icon.id === iconId ? "selectedAct" : ""} icon light-shadow`}
                    >
                        <Icon icons={allIcons} id={icon.id}/>
                    </div>
                )
                )}
            </div>
            <p className={`${errors.iconId? 'error': "hidden-error" } `}>{errors.iconId}</p>
            {/* {errors?.iconId && <p className="error">{errors.iconId}</p>} */}
            <button className="submit-btn" type="submit">{`${prevAct? 'Update' :"Create"}`}</button>
        </form>
    </div>
    )

}

export default ActivityFormModal
