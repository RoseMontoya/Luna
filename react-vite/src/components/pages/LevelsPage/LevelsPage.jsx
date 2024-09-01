import { useEffect, useState } from "react"
// import LevelFormModal from "./LevelFormModal"
// import LevelInput from "../../modals/LevelInput/LevelInpu÷t"
import '../../modals/LevelModals/LevelModal.css'
import { useModal } from "../../../context/Modal"
import LevelInput from "../../modals/LevelModals/LevelInput"
import { useDispatch, useSelector } from "react-redux"
import { getAllLevels } from "../../../redux/levels"
import { Loading } from "../../subcomponents"

function LevelsPage() {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const levelsObj = useSelector(state => state.levels.allLevels)

    const levels = levelsObj? Object.values(levelsObj) : []
    const [lvls, setLvls] = useState(levels || [])
    const [selected, setSelected] = useState('')
    console.log('lvls', lvls)
    console.log('levels', levelsObj)

    useEffect(() => {
        if (!levelsObj) {
            dispatch(getAllLevels())
                .then((res) => {
                    setLvls(Object.values(res))
                })
        }
    }, [dispatch, levelsObj])


  if (!user) return <Navigate to="/" replace={true} />;
  if (!levelsObj) return <Loading />


    const handleClick =() => {
        const newLvl = [...lvls, {id: lvls[lvls.length -1].id + 1}]
        setLvls(newLvl)
        setSelected(lvls[lvls.length -1].id + 1)
    }

    return (
        <main className="nav-open">
            <h1>Levels</h1>
            <div className="container">
            <div id="levels-edit" >
            <div style={{padding: '.25em 1em'}}>
                <div id="lvl-head" className="border-bottom">
                    <button style={{fontSize:'16px', padding: '0 5px'}} onClick={handleClick}>Add level</button>
                </div>
                <ul>
                    {lvls.map((level, idx) => (
                        <li key={level.id} >
                                <LevelInput levelsObj={levelsObj} selected={selected} setSelected={setSelected} level={level} idx={idx} lvls={lvls} setLvls={setLvls}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            </div>
        </main>
    )
}

export default LevelsPage
