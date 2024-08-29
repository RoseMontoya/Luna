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
        <div id="levels-edit">
            <div id="lvl-head" className="border-bottom">
                <h2>Levels</h2>
                <button style={{fontSize:'16px'}} onClick={handleClick}>Add level</button>
            </div>
            <ul>
                {lvls.map((level, idx) => (
                    <li key={level.id} >
                            <LevelInput selected={selected} setSelected={setSelected} level={level} idx={idx} lvls={lvls} setLvls={setLvls}/>
                    </li>
                ))}
            </ul>

        </div>
    )

}

export default LevelEditModal
