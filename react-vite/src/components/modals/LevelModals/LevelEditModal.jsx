import { useState } from "react"
// import LevelFormModal from "./LevelFormModal"
import LevelInput from "./LevelInput"
import './LevelModal.css'
import { useModal } from "../../../context/Modal"

function LevelEditModal({levelsObj}) {
    const {closeModal} = useModal()
    const levels = Object.values(levelsObj)
    const [lvls, setLvls] = useState(levels || [])
    const [selected, setSelected] = useState('')
    console.log('lvls', lvls)

    const handleClick =() => {
        const newLvl = [...lvls, {id: lvls[lvls.length -1].id + 1}]
        setLvls(newLvl)
        setSelected(lvls[lvls.length -1].id + 1)
    }

    // const handleDeselect = (e) => {
    //     e.stopPropagation()
    //     setSelected('')
    // }

    return (
        <div id="levels-edit" >
            <p className="nav-buttons" onClick={() => closeModal()}>Close</p>
            <div style={{padding: '.25em 1em'}}>
                <div id="lvl-head" className="border-bottom">
                    <h2>Levels</h2>
                    <button style={{fontSize:'16px', padding: '0 5px'}} onClick={handleClick}>Add level</button>
                </div>
                <ul>
                    {lvls.map((level, idx) => (
                        <li key={level.id} >
                                <LevelInput selected={selected} setSelected={setSelected} level={level} idx={idx} lvls={lvls} setLvls={setLvls}/>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )

}

export default LevelEditModal
