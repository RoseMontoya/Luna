// React Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";

// Component/Redux Imports
import {
  getAllEntries,
  getAllIcons,
  getAllActivities,
  getAllLevels,
} from "../../../redux";
import { Loading, Icon, Activities, Levels } from "../../subcomponents";
import { DeleteEntryModal, OpenModalButton } from "../../modals";
import { useNav } from "../../../context/navContext";

// Design Imports
import { BsDot } from "react-icons/bs";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import "./EntryDetail.css";

function EntryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entryId } = useParams();
  const { navOpen } = useNav();

  const user = useSelector((state) => state.session.user);
  // Get all entries, so use can flip through them
  const entriesObj = useSelector((state) => state.entries.allEntries);
  const entries = entriesObj
    ? Object.values(entriesObj).sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      )
    : [];

  // Find specific entry user is looking at
  const entry = entriesObj?.[entryId];

  const icons = useSelector((state) => state.icons.allIcons);
  const allActsObj = useSelector((state) => state.activities.allActivities);
  const allLevels = useSelector((state) => state.levels.allLevels);

  useEffect(() => {
    if (!entriesObj) {
      dispatch(getAllEntries(user.id));
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
  }, [dispatch, entryId, entriesObj, icons, user, allActsObj, allLevels]);

  // If no there is no user logged in, navigate to home page
  if (!user) return <Navigate to="/" replace={true} />;
  // If info hasn't loaded in, return loading component
  if (!entriesObj || !icons || !allActsObj || !allLevels) return <Loading />;

  // Function to go to the next entry before current
  const handleLessClick = () => {
    entries.forEach((entry, idx) => {
      if (entry.id === +entryId) {
        const next = entries[idx + 1];
        return navigate(`/entries/${next.id}`);
      }
    });
  };

  // Function to go to the next entry after current
  const handleGreaterClick = () => {
    entries.forEach((entry, idx) => {
      if (entry.id === +entryId) {
        const next = entries[idx - 1];
        return navigate(`/entries/${next.id}`);
      }
    });
  };

  return (
    <main className={`${navOpen ? "nav-open" : ""} side-nav`}>
      <Link to="/entries" className="nav-buttons">
        {"Return to Entries"}
      </Link>
      <div className="entries-container">
        <div className="entry" style={{ position: "relative" }}>

          {/* Less than click */}
          <button
            className={`circ-btn lighthover ${
              entries[entries.length - 1].id === +entryId ? "hidden" : ""
            }`}
            id="less-than"
            onClick={() => handleLessClick()}
          >
            <FaLessThan />
          </button>

            {/* Entry */}
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
                  navigate(`edit`);
                }}
              >
                Edit
              </p>
              <BsDot />
              <OpenModalButton
                className="delete-entry-btn"
                buttonText="Delete"
                modalComponent={
                  <DeleteEntryModal entry={entry} entries={entries} />
                }
              />
            </div>
          </div>

          <div className="entry-details">
            {/* Levels */}
            <div className="levels-container container">
              <div className="level">
                <h2>Overall: </h2>
                <div className="rating">{entry.overallMood}</div>
              </div>
              <Levels levels={allLevels} entryLvls={entry.EntryLevels} />
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

          {/* Greater than button */}
          <button
            className={`circ-btn ${entries[0].id === +entryId ? "hidden" : ""}`}
            id="greater-than"
            onClick={() => handleGreaterClick()}
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
    </main>
  );
}

export default EntryDetailsPage;
