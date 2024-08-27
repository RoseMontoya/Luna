import {useState } from "react"
import { useDispatch} from "react-redux"
import { Icon } from "../../subcomponents"
import { useModal } from "../../../context/Modal"
import { createActivity, editActivity } from "../../../redux/activities"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import EditActivitiesModal from "./EditActvitiesModal"

function AddActivityModal({ activities, allIcons, icons, prevAct }) {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { closeModal } = useModal()

    // const allIcons = useSelector(state => state.icons.allIcons)
    // const icons = allIcons? Object.values(allIcons) : []

    const [name, setName] = useState('' || prevAct.name)
    const [iconId, setIconId] = useState('' || prevAct.iconId)
    const [errors, setErrors] = useState({})

    // useEffect(() => {
    //     if (!allIcons) {
    //         dispatch(getAllIcons())
    //     }
    // }, [dispatch, allIcons])

    // if (!allIcons) return <Loading />

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors({})

        const thunk = prevAct? editActivity : createActivity

        dispatch(thunk({name, iconId, id: prevAct.id}))
            .then(closeModal)
            .catch(async (res) => {
                const errs = await res.json()
                console.log('errors', errs)
                setErrors(errs.errors)
            })
    }



    return (
    <div>
        {/* <button onClick={returnBack}>Back</button> */}
        <OpenModalButton
                buttonText="back"
                modalComponent={<EditActivitiesModal activities={activities} allIcons={allIcons} icons={icons}/>}
              />
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Enter activity:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && <p className="error">{errors.name}</p>}
            <label>Choose an icon:</label>
            <div className="activities">
                {icons.map(icon => (
                    <div key={icon.id} onClick={() => setIconId(icon.id)}
                    className={`${ icon.id === iconId ? "selectedAct" : ""}`}
                    >
                        <Icon icons={allIcons} id={icon.id}/>
                    </div>
                )
                )}
            </div>
            {errors?.iconId && <p className="error">{errors.iconId}</p>}
            <button type="submit">Create</button>
        </form>
    </div>
    )

}

export default AddActivityModal
