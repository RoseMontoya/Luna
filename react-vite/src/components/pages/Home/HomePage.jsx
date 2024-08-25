// import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Icon, Activities, Levels } from "../../subcomponents";
import { getEntriesToday } from "../../../redux/entries";
import { getAllIcons } from "../../../redux/icons";
import { BsDot } from "react-icons/bs";


function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries.today);
  const icons = useSelector(state => state.icons.allIcons)


  useEffect(() => {
    if (!entries) {
      dispatch(getEntriesToday(user.id));
    }
    if (!icons) {
        dispatch(getAllIcons())
    }
  }, [dispatch, user, entries, icons]);

  if (user && !entries || !icons) return <Loading />;

  return (
    <main id="landing-page">
      {user ? (
          <div className="nav-open">
            <h1>Today:</h1>
            {entries.length? <div id="entries-container">
            {entries
              .map((entry) => (
                <div
                  className="entry"
                  key={entry.id}
                  onClick={() => navigate(`${entry.id}`)}
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
                        <Levels levels={entry.Levels} />
                      </div>
                    </div>
                    <div className="activities-container container">
                      <h2>What have you been up to?</h2>
                      <Activities icons={icons} activities={entry.Activities} />
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
        <div>
          <h1 className="title-font">Welcome to Luna</h1>
          <p>Here to help you be mindful of your life.</p>
          <p>Chart how you feel. Track what you do.</p>
          <h2 className="title-font">
            No matter what phase I am in, I always remain whole
          </h2>
        </div>
      )}
    </main>
  );
}

export default Home;
