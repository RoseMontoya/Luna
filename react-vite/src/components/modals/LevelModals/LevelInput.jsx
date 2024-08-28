import { useState } from "react"
import { useDispatch } from "react-redux"
import { createLevel, deleteLevel, editLevel } from "../../../redux/levels"

function LevelInput({level, idx, setSelected, selected, lvls, setLvls}) {
    console.log('do we get here??')
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const [name, setName] = useState(level?.name || '')
    const isSelelcted = level.id === selected

    const handleEdit = () => {
        setSelected(level.id)
    }

    const handleSave = async () => {
        console.log('level', level, 'name', name)
        try {
            if (level.updatedAt) {
                await dispatch(editLevel({...level, name}))
            } else {
                await dispatch(createLevel({name: name}))
            }
            setSelected("")
        } catch (e) {
            console.log('error', e)
            const err = await e.json()
            setError(err.errors)
        }
    }

    const handleDelete = async() => {
        dispatch(deleteLevel(level.id))
            .then(() => {
                setSelected('')
                const newLvls = [...lvls]
                newLvls.splice(idx, 1)
                setLvls(newLvls)


            })
    }

    return (
        <>
        <div>
            <input
                // onClick={() => setSelected(level.id)}
                disabled={!isSelelcted}
                className='level-input'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please entry activity"
            />
            <button onClick={handleEdit} className={`${isSelelcted? "hidden" : ''}`}>Edit</button>
            <button onClick={handleSave} className={`${isSelelcted? "" : 'hidden'}`}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        {error?.name && <p className="error">{error.name}</p>}
        </>
    )
}

export default LevelInput
