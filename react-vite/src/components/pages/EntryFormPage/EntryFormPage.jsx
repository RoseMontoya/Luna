// Library Imports
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

//  Components/Redux Imports
import { Icon, Loading } from "../../subcomponents";
import {
  createEntry,
  getEntryById,
  editEntry,
  getAllIcons,
  getAllLevels,
  getAllActivities,
} from "../../../redux";
import {
  EditActivitiesModal,
  LevelEditModal,
  OpenModalButton,
} from "../../modals";
import entryValidation from "./entryValidation";
import { useNav } from "../../../context/navContext";

// Design Imports
import "react-datepicker/dist/react-datepicker.css";
import "./EntryForm.css";

function EntryFormPage({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
  const { navOpen } = useNav();
  const entry = useSelector((state) => state.entries.entriesById?.[entryId]);

  const [date, setDate] = useState(new Date());
  const [mood, setMood] = useState("");
  const [overallMood, setOverallMood] = useState("");
  const [selectedIcon, setSelectedIcon] = useState({});
  const [note, setNote] = useState("");
  const [acts, setActs] = useState(new Set());
  const [errors, setErrors] = useState({});

  const allIcons = useSelector((state) => state.icons.allIcons);
  const icons = allIcons ? Object.values(allIcons) : [];
  const moodIcons = icons.slice(0, 19);
  const levelsObj = useSelector((state) => state.levels.allLevels);
  const levels = levelsObj ? Object.values(levelsObj) : [];
  const [levelRatings, setLevelsRating] = useState({});
  const activitiesObj = useSelector((state) => state.activities.allActivities);
  const activities = activitiesObj ? Object.values(activitiesObj) : [];

  useEffect(() => {
    if (!allIcons) {
      dispatch(getAllIcons());
    }
    if (!levelsObj) {
      dispatch(getAllLevels());
    }
    if (!activitiesObj) {
      dispatch(getAllActivities());
    }
  }, [dispatch, allIcons, levelsObj, activitiesObj, levelRatings]);

  useEffect(() => {
    if (!entry && type === "edit") {
      dispatch(getEntryById(entryId));
    }

    if (type === "edit" && entry && allIcons && !overallMood) {
      setDate(format(entry.datetime, "yyyy-MM-dd HH:mm"));
      setMood(entry.mood);
      setOverallMood(entry.overallMood);
      setSelectedIcon(allIcons[entry.iconId]);
      setNote(entry.note || "");

      const startStateLevels = {};

      entry.EntryLevels.forEach((level) => {
        if (level.rating > 0) {
          startStateLevels[level.levelId] = level.rating;
        }
      });
      setLevelsRating(startStateLevels);

      const activities = new Set();
      entry.EntryActivities.forEach((act) => {
        activities.add(act.activityId);
      });
      setActs(activities);
    }
  }, [dispatch, entry, type, entryId, allIcons, overallMood]);

  useEffect(() => {
    if (mood.length > 20) {
      setMood(mood.slice(0, 21));
      setErrors({ mood: "Cannot be longer than 20 characters." });
    }
    if (note.length > 255) {
      setNote(note.slice(0, 256));
      setErrors({ note: "Note cannot be longer than 255 characters." });
    }

    if (mood.length > 2 && mood.length <= 20) {
      setErrors((prev) => {
        const { mood, ...rest } = prev;
        return rest;
      });
    }
    if (note.length > 9 && note.length <= 255) {
      setErrors((prev) => {
        const { note, ...rest } = prev;
        return rest;
      });
    }
  }, [note, mood]);

  if (!user) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const errs = entryValidation({
      date,
      mood,
      overallMood,
      selectedIcon,
      note,
    });

    if (Object.values(errs).length) return setErrors(errs);

    const lvls = [];
    for (const [levelId, rating] of Object.entries(levelRatings)) {
      if (levelsObj[levelId] && rating > 0) {
        lvls.push({ levelId: Number(levelId), rating: Number(rating) });
      }
    }

    const entriesActs = [];
    for (const actId of acts.values()) {
      if (activitiesObj[actId]) {
        entriesActs.push(Number(actId));
      }
    }

    const payload = {
      datetime: date,
      mood,
      overallMood,
      iconId: selectedIcon.id,
      note,
      levels: lvls,
      activities: entriesActs,
    };

    const thunk = type === "edit" ? editEntry : createEntry;

    dispatch(thunk(payload, entryId))
      .then((res) => {
        navigate(`/entries/${res.id}`);
      })
      .catch(async (err) => {
        const errs = await err.json();
        setErrors(errs.errors);
      });
  };

  if (!allIcons || !levelsObj || !activitiesObj) return <Loading />;

  const handleSelect = (actId) => {
    if (acts.has(actId)) {
      const newA = new Set(acts);
      newA.delete(actId);
      setActs(newA);
    } else {
      const newA = new Set(acts);
      setActs(newA.add(actId));
    }
  };

  return (
    <main className={`${navOpen ? "nav-open" : ""}`}>
      <p className="nav-buttons" onClick={() => navigate(-1)}>
        Back
      </p>
      <div id="entry-form" className="entries-container">
        <form
          className="container"
          style={{ padding: "2em 4em", margin: 0 }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 style={{ textAlign: "center" }}>How are you?</h1>
          <div className="date-container">
            <div>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                className="date-input"
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeInput
                timeIntervals={1}
                dateFormat="EEEE, MMM d h:mm a"
              />
            </div>
            <p
              style={{ paddingLeft: "1em" }}
              className={`${errors.datetime ? "error" : "hidden-error"} `}
            >
              {errors.datetime}
            </p>
          </div>
          <div className="border-bottom">
            <label>
              In one word, how are you feeling?
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
              <p className={`${errors.mood ? "error" : "hidden-error"} `}>
                {errors.mood}
              </p>
            </label>
            <label>
              {`On a scale of 1 to 10, how would rating your overall mood?  `}
              <select
                name="overallMood"
                id="overallMood"
                value={overallMood}
                onChange={(e) => setOverallMood(e.target.value)}
              >
                <option value="">--</option>
                {[...new Array(10)].map((val, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
              <p
                className={`${errors.overallMood ? "error" : "hidden-error"} `}
              >
                {errors.overallMood}
              </p>
            </label>
            <label>
              Choose an icon that best represents your mood:
              <div className="icons-container">
                {moodIcons.map((icon) => (
                  <div
                    key={icon.id}
                    onClick={() => setSelectedIcon(icon)}
                    className={`${
                      icon.id === selectedIcon.id ? "selected" : ""
                    } overall-mood-icon selectable-icon light-shadow`}
                  >
                    <Icon id={icon.id} icons={allIcons} />
                  </div>
                ))}
              </div>
              <p className={`${errors.iconId ? "error" : "hidden-error"} `}>
                {errors.iconId}
              </p>
            </label>
            <div className="note-form-container">
              <label>Would you like to add a small note to this entry?</label>
              <textarea
                className="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <p className={`${errors.note ? "error" : "hidden-error"} `}>
                {errors.note}
              </p>
            </div>
          </div>
          <div className="border-bottom">
            <h2>Levels</h2>
            <div className="lvls-container">
              {levels.map((level) => (
                <div key={level.id} className="lvl act-form">
                  <p>{level.name}</p>
                  <select
                    name={level.name}
                    id={level.name}
                    value={levelRatings[level.id]}
                    onChange={(e) =>
                      setLevelsRating({
                        ...levelRatings,
                        [level.id]: e.target.value,
                      })
                    }
                  >
                    <option value="">--</option>
                    {[...new Array(10)].map((val, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="edit-btn" onClick={(e) => e.preventDefault()}>
              <OpenModalButton
                buttonText="Edit levels"
                modalComponent={<LevelEditModal levelsObj={levelsObj} />}
              />
            </div>
          </div>
          <div>
            <h2>Activities</h2>
            <div className="activities">
              {activities.map((activity) => (
                <div key={activity.id} className="activity">
                  {/* <div className={`${idx === 0 ? 'hidden': ""}`}>
                        <BsDot />
                    </div> */}
                  <div
                    onClick={() => handleSelect(activity.id)}
                    className={`${
                      acts.has(activity.id) ? "selectedAct" : ""
                    } icon selectable-icon light-shadow`}
                  >
                    <Icon icons={allIcons} id={activity.iconId} />
                  </div>
                  <p>{activity.name}</p>
                </div>
              ))}
            </div>
            <div className="edit-btn" onClick={(e) => e.preventDefault()}>
              <OpenModalButton
                buttonText="Edit activites"
                modalComponent={
                  <EditActivitiesModal acts={acts} setActs={setActs} />
                }
              />
            </div>
          </div>
          <button className="submit-btn" type="submit">{`${
            type === "edit" ? "Update" : "Create"
          }`}</button>
        </form>
      </div>
    </main>
  );
}

export default EntryFormPage;
