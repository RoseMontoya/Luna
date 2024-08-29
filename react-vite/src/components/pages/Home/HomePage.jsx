// import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loading, Icon, Activities, Levels } from "../../subcomponents";
import { deleteEntry, getEntriesToday } from "../../../redux/entries";
import { getAllIcons } from "../../../redux/icons";
import { BsDot } from "react-icons/bs";
import { getAllLevels } from "../../../redux/levels";
import { getAllActivities } from "../../../redux/activities";


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const entriesObj = useSelector((state) => state.entries.today);
  const icons = useSelector(state => state.icons.allIcons)
  const entries = entriesObj? Object.values(entriesObj) : []
  const allActsObj = useSelector((state) => state.activities.allActivities)
  const allLevels = useSelector(state => state.levels.allLevels)

  useEffect(() => {
    if (user) {
      if (!entriesObj) {
        dispatch(getEntriesToday(user.id));
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
    }
  }, [dispatch, user, entriesObj, icons, allActsObj, allLevels]);

  if (user && (!entriesObj || !icons || !allActsObj || !allLevels)) return <Loading />;

  return (
    <main id="landing-page">
      {user ? (
          <div className="nav-open">
            <h1 style={{paddingTop: '1rem'}}>Today:</h1>
            {entries.length? <div id="entries-container">
            {entries
              .map((entry) => (
                <div
                  className="entry"
                  key={entry.id}
                  onClick={() => navigate(`entries/${entry.id}`)}
                >
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
                    <p onClick={(e) => {e.stopPropagation(); navigate(`entries/${entry.id}/edit`)}}>Edit</p>
                <BsDot />
                <p onClick={(e) => {e.stopPropagation(); dispatch(deleteEntry(entry.id))}}>Delete</p>
                    </div>
                  </div>
                  <div className="entry-details">
                    <div className="levels-container container">
                      <div className="level">
                        <h2>Overall: </h2>
                        <div className="rating">{entry.overallMood}</div>
                      </div>
                        <Levels levels={allLevels}  entryLvls={entry.EntryLevels} />
                    </div>
                    <div className="activities-container container">
                      <h2>What have you been up to?</h2>
                      <div className="acts">
                        <Activities icons={icons} activities={allActsObj} entryActs={entry.EntryActivities} />
                      </div>
                    </div>
                    <div className="note-container container">
                      <h2>Note:</h2>
                      <p>{entry.note}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>:
          <div>
            <p>No entries available for today</p>
            <Link to='entries/new'>New Entry</Link>
          </div>}

        </div>
      ) : (
        <div >
          <div id="home-logged-out">
            <div>
              <h1 className="title-font" id="title">Welcome to Luna</h1>
              <p>Here to help you be mindful of your life.</p>
              <p>Chart how you feel. Track what you do.</p>
            </div>
          <h2 className="title-font" >
            No matter what phase I am in, I always remain whole
          </h2>
          </div>
          <div id='luna-image'><img src="./images/home-page-image.png" /></div>
        </div>
      )}
    </main>
  );
}

export default Home;
