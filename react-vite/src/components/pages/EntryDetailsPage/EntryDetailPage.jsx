import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { deleteEntry, getAllEntries } from "../../../redux/entries";
import { Loading, Icon, Activities, Levels } from "../../subcomponents";
import { BsDot } from "react-icons/bs";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import './EntryDetail.css'
import { getAllIcons } from "../../../redux/icons";
import { getAllActivities } from "../../../redux/activities";
import { getAllLevels } from "../../../redux/levels";
import OpenModalButton from "../../modals/OpenModalButton/OpenModalButton";
import { DeleteEntryModal } from "../../modals";

function EntryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { entryId } = useParams();
  const user = useSelector((state) => state.session.user);
  const entriesObj = useSelector((state) => state.entries.allEntries);

  const entries = entriesObj ? Object.values(entriesObj).sort((a, b) => new Date(b.datetime) - new Date(a.datetime)) : [];
  const entry = entriesObj?.[entryId]

  const icons = useSelector(state => state.icons.allIcons)
  const allActsObj = useSelector((state) => state.activities.allActivities)
  const allLevels = useSelector(state => state.levels.allLevels)

  useEffect(() => {
    if (!entriesObj) {
      dispatch(getAllEntries(user.id));
    }
    if (!icons) {
      dispatch(getAllIcons())
    }
    if (!allActsObj) {
      dispatch(getAllActivities())
    }
    if (!allLevels) {
      dispatch(getAllLevels())
    }
  }, [dispatch, entryId, entriesObj, icons, user, allActsObj, allLevels]);

  if (!user) return <Navigate to="/" replace={true} />;

  if (!entriesObj || !icons || !allActsObj || !allLevels) return <Loading />;


  const handleLessClick = () => {
    entries.forEach((entry, idx) => {
      if (entry.id === +entryId) {
        const next = entries[idx + 1]
        return navigate(`/entries/${next.id}`)
      }
    })
  }

  const handleGreaterClick = () => {
    entries.forEach((entry, idx) => {
      if (entry.id === +entryId) {
        const next = entries[idx - 1]
        return navigate(`/entries/${next.id}`)
      }
    })
  }

  const handleDelete = () => {
    dispatch(deleteEntry(entryId))
      .then(() => {
        if (entries.length <= 1) navigate('/')
        else navigate('/entries')
      })
  }

  return (
    <main className="nav-open">
        <Link to='/entries' className="nav-buttons">{"< Entries"}</Link>
      <div id="entries-container" >
        {/* <h1>Entries</h1> */}
        <div className="entry" style={{ position: 'relative'}}>
          <button className={`circ-btn ${entries[entries.length - 1].id === +entryId? 'hidden': ''}` }id="less-than"
          onClick={() => handleLessClick()}><FaLessThan/></button>
          <div className="entry-header">
            <div className="entry-info">
              <div className="mood-icon">
                <Icon icons={icons} id={entry.iconId} />
              </div>
              <div className="entry-info-text">
                <h2>{entry.date}</h2>
                <h3>{entry.mood}</h3>
                <p>{entry.time}</p>
              </div>
            </div>
            <div className="entry-buttons">
              <p onClick={(e) => {e.stopPropagation(); navigate(`edit`)}}>Edit</p>
              <BsDot />
              {/* <p onClick={(e) => {e.stopPropagation(); handleDelete()}}>Delete</p> */}
              <OpenModalButton
                className='delete-entry-btn'
                buttonText="Delete"
                modalComponent={<DeleteEntryModal  entry={entry} entries={entries}/>}
              />
            </div>

          </div>
          <div className="entry-details">
            <div className="levels-container container">
              <div className="level">
                <h2>Overall: </h2>
                <div className="rating">{entry.overallMood}</div>
              </div>
              <Levels levels={allLevels} entryLvls={entry.EntryLevels}/>
            </div>
            <div className="activities-container container">
              <h2>What have you been up to?</h2>
              <div className="acts">
                <Activities icons={icons} activities={allActsObj} entryActs={entry.EntryActivities}/>
              </div>
            </div>
            <div className="note-container container">
              <h2>Note:</h2>
              <p>{entry.note}</p>
            </div>
          </div>
          <button className={`circ-btn ${entries[0].id === +entryId? 'hidden' : ''}`} id="greater-than" onClick={() => handleGreaterClick()}><FaGreaterThan/></button>
        </div>
      </div>
    </main>
  );
}

export default EntryDetailsPage;
