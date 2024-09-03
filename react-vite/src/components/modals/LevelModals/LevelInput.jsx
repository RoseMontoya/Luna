import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createLevel, editLevel } from "../../../redux/levels"
import DeleteLevelModal from "./DeleteLevelModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"

function LevelInput({level, levelsObj, idx, setSelected, selected, lvls, setLvls}) {
    // console.log('do we get here??')
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const [name, setName] = useState(level?.name || '')
    const isSelelcted = level.id === selected

    const inputRef = useRef(null)
    const editBtnRef = useRef(null)
    // console.log("inputRef",inputRxef)

    useEffect(() => {
        if (name.length > 15 ) {
            setName(name.slice(0, -1))
            setError({name: 'Level name cannot be longer than 15 characters.'})
        }
    }, [name])

    const handleEdit = () => {
        setSelected(level.id)
    }


    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         // console.log('target', e.target.contains('level-input'), 'Input current', inputRef.current, '...', !inputRef.current.contains(e.target),  'Edit current', editBtnRef.current, '...', editBtnRef.current.contains(e.target), 'res', inputRef.current &&
    //         // !inputRef.current.contains(e.target) &&
    //         // !editBtnRef.current.contains(e.target))
    //         // if (inputRef.current && !inputRef.current.contains(e.target) && !e.target === "<button className=\"hidden lvl-btns\">Edit</button>") {
    //         //     console.log('inside if statement')
    //         //     setSelected('')
    //         // }
    //             if (
    //                 inputRef.current &&
    //                 !inputRef.current.contains(e.target) &&
    //                 !editBtnRef.current.contains(e.target)
    //             ) {
    //                 setSelected('');
    //             }

    //     }
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside)
    //     }
    // }, [setSelected])

    const handleSave = async () => {
        console.log('level', level, 'name', name)
        setError({})
        if (!name || name.length < 3 || name.length > 15) {
            return setError({name: 'Level name must between 2 and 15 characters.'})
        }
        try {
            if (level.updatedAt) {
                await dispatch(editLevel({...level, name: name.toLowerCase()}))
            } else {
                await dispatch(createLevel({name: name.toLowerCase()}))
                    .then((res) => {
                        const newLvls = [...lvls]
                        newLvls.splice(idx, 1, res)
                        setLvls(newLvls)
                    })
            }
            setSelected("")
        } catch (e) {
            console.log('error', e)
            const err = await e.json()
            setError(err.errors)
        }
    }

    // const handleDelete = async() => {
    //     dispatch(deleteLevel(level.id))
    //         .then(() => {
    //             setSelected('')
    //             const newLvls = [...lvls]
    //             newLvls.splice(idx, 1)
    //             setLvls(newLvls)


    //         })
    // }

    // const lvlInput =

    return (
        <>
        <div className="lvl" >
            <input
                // onClick={() => setSelected(level.id)}
                disabled={!isSelelcted}
                className='level-input'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please enter level"
                onClick={() => setSelected(level.id)}
                ref={inputRef}
            />
            <button  ref={editBtnRef} onClick={handleEdit} className={`${isSelelcted? "hidden" : ''} lvl-btns`}>Edit</button>
            <button onClick={handleSave} className={`${isSelelcted? "" : 'hidden'} lvl-btns`}>Save</button>
            <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteLevelModal idx={idx} level={level} lvls={lvls} setLvls={setLvls} setSelected={setSelected} levelsObj={levelsObj}/>}
                />
        </div>
        <p className={`${error.name? 'error': "hidden-error" } `}>{error.name}</p>
        </>
    )
}

export default LevelInput
