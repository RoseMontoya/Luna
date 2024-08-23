import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getAllEntries } from "../../../redux/entries";
import { Loading, Icon, Activities } from "../../subcomponents";
import { BsDot } from "react-icons/bs";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import './EntryDetail.css'
import { getAllIcons } from "../../../redux/icons";

function EntryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { entryId } = useParams();
  const user = useSelector((state) => state.session.user);
  const entriesObj = useSelector((state) => state.entries.allEntries);

  const entries = entriesObj ? Object.values(entriesObj).sort((a, b) => new Date(b.datetime) - new Date(a.datetime)) : [];
  const entry = entriesObj?.[entryId]
  console.log(entries)

  const icons = useSelector(state => state.icons.allIcons)

  useEffect(() => {
    if (!entriesObj) {
      dispatch(getAllEntries(user.id));
    }
    if (!icons) {
      dispatch(getAllIcons())
    }
  }, [dispatch, entryId, entriesObj, icons, user]);

  if (!user) return <Navigate to="/" replace={true} />;

  if (!entriesObj || !icons || !entries.length) return <Loading />;


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

  return (
    <main className="nav-open">
      <div id="entries-container" >
        {/* <h1>Entries</h1> */}
        <div className="entry" style={{marginTop: '4em', position: 'relative'}}>
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
              <p>Edit</p>
              <BsDot />
              <p>Delete</p>
            </div>

          </div>
          <div className="entry-details">
            <div className="levels-container container">
              <div>
                <h2>Overall: </h2>
                <div>{entry.overallMood}</div>
              </div>
            </div>
            <div className="activities-container container">
              <h2>What have you been up to?</h2>
              <Activities icons={icons} activities={entry.Activities}/>
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
