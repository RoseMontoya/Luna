import './EntriesList.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllEntries } from '../../../redux/entries'
import { Loading, Icon } from '../../subcomponents'
import { Navigate } from 'react-router-dom'
// import { Home } from '../'

function EntriesListPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const entriesObj = useSelector(state => state.entries.allEntries)
    const entries = entriesObj? Object.values(entriesObj) : []
    console.log(entries)

    useEffect(() => {
        if (!entriesObj && user){
            dispatch(getAllEntries(user.id))
        }
    }, [dispatch, entriesObj, user])

    if (!user) return <Navigate to='/' replace={true}/>
//
    if (!entriesObj) return <Loading />

    return (
        <main>
            <h1>Entries</h1>
            <div id='entries-container'>
                {entries.map(entry => (
                    <div className='entry'>
                        <div className='entry-header'>
                            <div className='mood-icon'>
                                <Icon id={entry.iconId}/>
                            </div>
                            <h2>{entry.date}</h2>
                            <h3>{entry.mood}</h3>
                            <div>
                                <p>Edit</p>
                                <p>Delete</p>
                            </div>
                        </div>
                        <p>{entry.time}</p>
                        <div className='levels-container'>
                            <div>
                            <h2>Overall: </h2>
                            <div>{entry.overallMood}</div>
                            </div>
                        </div>
                        <div className='activities-container'>
                            <h2>What have you been up to?</h2>
                        </div>
                        <div className='note-container'>
                            <p>{entry.note}</p>
                        </div>
                    </div>

                ))}
            </div>
        </main>
    )
}

export default EntriesListPage
