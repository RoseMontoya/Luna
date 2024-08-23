import "./EntriesList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntries } from "../../../redux/entries";
import { Loading, Icon } from "../../subcomponents";
import { Navigate, useNavigate } from "react-router-dom";
import "./EntriesList.css";
import { BsDot } from "react-icons/bs";

function EntriesListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.session.user);
  const entriesObj = useSelector((state) => state.entries.allEntries);
  const entries = entriesObj ? Object.values(entriesObj) : [];
  console.log(entries);

  useEffect(() => {
    if (!entriesObj && user) {
      dispatch(getAllEntries(user.id));
    }
  }, [dispatch, entriesObj, user]);

  if (!user) return <Navigate to="/" replace={true} />;
  //
  if (!entriesObj) return <Loading />;

  return (
    <main className="nav-open">
      <div id="entries-container">
        <h1>Entries</h1>
        {entries.map((entry) => (
          <div className="entry" key={entry.id} onClick={() => navigate(`${entry.id}`)}>
            <div className="entry-header">
              <div className="entry-info">
                <div className="mood-icon">
                  <Icon id={entry.iconId} />
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
                </div>
                <div className="note-container container">
                  <p>{entry.note}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default EntriesListPage;
