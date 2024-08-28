import { useState } from "react"
// import LevelFormModal from "./LevelFormModal"
import LevelInput from "./LevelInput"
import './LevelModal.css'

function LevelEditModal({levelsObj}) {
    const levels = Object.values(levelsObj)
    const [lvls, setLvls] = useState(levels || [])
    const [selected, setSelected] = useState('')
    console.log('selected', selected)

    const handleClick =() => {
        const newLvl = [...lvls, {id: lvls[lvls.length -1].id + 1}]
        setLvls(newLvl)
        setSelected(lvls[lvls.length -1].id + 1)
    }

    return (
        <div>
            <h2>Levels</h2>
            <ul>
                {lvls.map((level, idx) => (
                    <li key={level.id} >
                            <LevelInput selected={selected} setSelected={setSelected} level={level} idx={idx} lvls={lvls} setLvls={setLvls}/>
                    </li>
                ))}
            </ul>
            <button onClick={handleClick}>Add level</button>

        </div>
    )

}

export default LevelEditModal
