// React Imports
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Component/Redux Imports
import {
  Loading,
  Icon,
  Activities,
  Levels,
  FrontPageAnimation,
} from "../../subcomponents";
import {
  getEntriesToday,
  getAllIcons,
  getAllActivities,
  getAllLevels,
} from "../../../redux";
import { DeleteEntryModal, OpenModalButton } from "../../modals";

// Design Imports
import { BsDot } from "react-icons/bs";
import "./HomePage.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab info from state
  const user = useSelector((state) => state.session.user);
  const icons = useSelector((state) => state.icons.allIcons);
  const allActsObj = useSelector((state) => state.activities.allActivities);
  const allLevels = useSelector((state) => state.levels.allLevels);

  // Entries
  const entriesObj = useSelector((state) => state.entries.today);
  const entries = entriesObj
    ? Object.values(entriesObj).sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      )
    : [];

  // Thunk dispatches
  useEffect(() => {
    if (user) {
      if (!entriesObj) {
        dispatch(getEntriesToday(user.id));
      }
      if (!icons) {
        dispatch(getAllIcons());
      }
      if (!allActsObj) {
        dispatch(getAllActivities());
      }
      if (!allLevels) {
        dispatch(getAllLevels());
      }
    }
  }, [dispatch, user, entriesObj, icons, allActsObj, allLevels]);

  // If info hasn't loaded in and there is a user logged in, return loading component
  if (user && (!entriesObj || !icons || !allActsObj || !allLevels))
    return <Loading />;

  return (
    <main id="landing-page">
      {/* Logged in home page */}
      {user ? (
        <div className="nav-open">
          <h1 style={{ paddingTop: "32px" }}>Today:</h1>

          {/* Entries */}
          {entries.length ? (
            <div className="entries-container">
              {entries.map((entry) => (
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

                    {/* Entry Buttons */}
                    <div className="entry-buttons">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`entries/${entry.id}/edit`);
                        }}
                      >
                        Edit
                      </p>
                      <BsDot />
                      <div onClick={(e) => e.stopPropagation()}>
                        <OpenModalButton
                          className="delete-entry-btn"
                          buttonText="Delete"
                          modalComponent={
                            <DeleteEntryModal entry={entry} entries={entries} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="entry-details">
                    {/* Levels */}
                    <div className="levels-container container">
                      <div className="level">
                        <h2>Overall: </h2>
                        <div className="rating">{entry.overallMood}</div>
                      </div>
                      <Levels
                        levels={allLevels}
                        entryLvls={entry.EntryLevels}
                      />
                    </div>

                    {/* Activities */}
                    <div className="activities-container container">
                      <h2>What have you been up to?</h2>
                      <div className="acts">
                        <Activities
                          icons={icons}
                          activities={allActsObj}
                          entryActs={entry.EntryActivities}
                        />
                      </div>
                    </div>
                    <div className="note-container container">
                      <h2>Note:</h2>
                      <p>{entry.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-entries">
              <p>No entries available for today</p>
              <Link to="entries/new">New Entry</Link>
            </div>
          )}
        </div>
      ) : (
        // <div>
          // {/* Logged out home page */}
          <div id="home-logged-out">
            <div>
              <h1 className="title-font" id="title">
                Welcome to Luna
              </h1>
              <p id="p1">Be mindful of your life.</p>
              <p id="p2" style={{ textAlign: "center" }}>
                Chart how you feel.
              </p>{" "}
              <p id="p3" style={{ textAlign: "right" }}>
                {" "}
                Track what you do.
              </p>
            </div>
            <h2 className="title-font">
              No matter what phase I am in, I always remain whole
            </h2>
            <FrontPageAnimation />
          </div>
        // </div>
      )}
    </main>
  );
}

export default Home;
