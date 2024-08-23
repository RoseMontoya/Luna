import "./EntriesList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntries } from "../../../redux/entries";
import { Loading, Icon, Activities } from "../../subcomponents";
import { Navigate, useNavigate } from "react-router-dom";
import "./EntriesList.css";
import { BsDot } from "react-icons/bs";
// import { csrfFetch } from "../../../redux/csrf";
import { getAllIcons } from "../../../redux/icons";

function EntriesListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.session.user);
  const entriesObj = useSelector((state) => state.entries.allEntries);
  // const entriesObj = useLoaderData()
  const entries = entriesObj ? Object.values(entriesObj) : [];
  const icons = useSelector(state => state.icons.allIcons)

  useEffect(() => {
    if (!entriesObj && user) {
      dispatch(getAllEntries(user.id));
    }
    if (!icons) {
      dispatch(getAllIcons())
    }
  }, [dispatch, entriesObj, user, icons]);

  if (!user) return <Navigate to="/" replace={true} />;
  //
  if (!entriesObj || !icons || !entries.length) return <Loading />;

  return (
    <main className="nav-open">
      <div id="entries-container">
        <h1>Entries</h1>
        {entries.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)).map((entry) => (
          <div className="entry" key={entry.id} onClick={() => navigate(`${entry.id}`)}>
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
                  {console.log(entry.Activities)}
                  <Activities icons={icons} activities={entry.Activities}/>
                </div>
                <div className="note-container container">
                  <h2>Note:</h2>
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


// export const entriesLoader = async(user) => {
//   const response = await csrfFetch(`/api/users/${user.id}/entries`)

//   const data = await response.json()

//     data.map(entry => {
//       const formattedDate = format(entry.datetime, "EEEE, MMM d . h:mm a").split(" . ")
//       entry.date = formattedDate[0]
//       entry.time = formattedDate[1]
//     })
//     return data
// }
