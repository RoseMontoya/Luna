import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { getEntryById } from "../../../redux/entries";
import { Loading, Icon } from "../../subcomponents";
import { BsDot } from "react-icons/bs";



function EntryDetailsPage() {
    const dispatch = useDispatch()
    const {entryId} = useParams()
    const user = useSelector((state) => state.session.user);
    const entry = useSelector((state) => state.entries.allEntries?.[entryId]);

  useEffect(() => {
    if (!entry) {
        dispatch(getEntryById(entryId))
    }
  }, [dispatch, entryId, entry])

  if (!user) return <Navigate to="/" replace={true} />;

  if (!entry) return <Loading />;


  return (
    <main className="nav-open">
      <div id="entries-container">
        <h1>Entries</h1>
        <div className="entry">
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
      </div>
    </main>
  );
}

export default EntryDetailsPage;
