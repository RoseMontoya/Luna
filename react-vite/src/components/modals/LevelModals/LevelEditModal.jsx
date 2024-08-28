import { useState } from "react"
import LevelFormModal from "./LevelFormModal"
import LevelInput from "./LevelInput"
import './LevelModal.css'

function LevelEditModal({levels}) {
    const [lvls, setlvls] = useState(levels || [])
    const [selected, setSelected] = useState('')
    console.log('selected', selected)

    const handleClick =() => {
        const newLvl = [...lvls, {id: lvls[lvls.length -1].id + 1}]
        setlvls(newLvl)
        setSelected(lvls[lvls.length -1].id + 1)
    }

    return (
        <div>
            <h2>Levels</h2>
            <ul>
                {lvls.map(level => (
                    <li key={level.id} >
                            <LevelInput selected={selected} setSelected={setSelected} level={level}/>
                    </li>
                ))}
            </ul>
            <button onClick={handleClick}>Add level</button>

        </div>
    )

}

export default LevelEditModal
