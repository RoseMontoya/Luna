import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getAllIcons } from "../../../redux/icons";
import { Icon, Loading } from "../../subcomponents";
import "./EntryForm.css";
import { createEntry, getEntryById, editEntry } from "../../../redux/entries";
import { getAllLevels } from "../../../redux/levels";
import { getAllActivities } from "../../../redux/activities";
import OpenModalButton from "../../modals/OpenModalButton/OpenModalButton";
import { EditActivitiesModal, LevelEditModal } from "../../modals";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { BsDot } from "react-icons/bs";


function EntryFormPage({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
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
  const moodIcons = icons.slice(0, 5);
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
      dispatch(getAllLevels())
      // .then((res) => {
      //   if (!levelRatings) {
      //     const startStateLevels = {};

      //     res.forEach((level) => (startStateLevels[level.id] = 0));
      //     setLevelsRating(startStateLevels);
      //   }
      // });
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

      entry.EntryLevels.forEach(
        (level) => {
          if (level.rating > 0) {
            startStateLevels[level.levelId] = level.rating
          }
        }
      );
      setLevelsRating(startStateLevels);

      const activities = new Set();
      entry.EntryActivities.forEach((act) => {
        activities.add(act.activityId);
      });
      setActs(activities);
    }
  }, [dispatch, entry, type, entryId, allIcons, overallMood]);

  if (!user) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const lvls = [];
    for (const [levelId, rating] of Object.entries(levelRatings)) {
      if (levelsObj[levelId] && rating > 0) {
        lvls.push({ levelId: Number(levelId), rating: Number(rating) });
      }
    }
    const entriesActs = [];
    for (const actId of acts.values()) {
      entriesActs.push(Number(actId));
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
    <main className="nav-open">
      <div id="entry-form" >
        <p className="nav-buttons" onClick={() => navigate(-1)}>Back</p>
        <form
          className="container"
          style={{ padding: "2em 4em" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 style={{textAlign: 'center'}}>How are you?</h1>
          {/* <input
            className="date-input"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /> */}
          <div className="date-container">
<div>

              <DatePicker  showIcon toggleCalendarOnIconClick className="date-input" selected={date} onChange={(date) => setDate(date)}  showTimeInput timeIntervals={1} dateFormat='EEEE, MMM d h:mm a' />
</div>
            <p style={{paddingLeft: '1em'}} className={`${errors.datetime? 'error': "hidden-error" } `}>{errors.datetime}</p>
          </div>
          {/* {errors?.datetime && <p className="error">{errors.datetime}</p>} */}
          <div className="border-bottom">
            <label>In one word, how are you feeling?
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
<p className={`${errors.mood? 'error': "hidden-error" } `}>{errors.mood}</p>
            </label>
            {/* {errors?.mood && <p className="error">{errors.mood}</p>} */}
            <label>{`On a scale of 1 to 10, how would rating your overall mood?  `}
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
                  {/* {idx === 0? ' (lowest)' : ""}
                        {idx === 9? ' (highest)' : ""} */}
                </option>
              ))}
            </select>
            <p className={`${errors.overallMood? 'error': "hidden-error" } `}>{errors.overallMood}</p>
            </label>
            {/* {errors?.overallMood && (
              <p className="error">{errors.overallMood}</p>
            )} */}
            <label>Choose an icon that best represents your mood:

            <div className="icons-container">
              {moodIcons.map((icon) => (
                <div
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon)}
                  className={`${icon.id === selectedIcon.id ? "selected" : ""} overall-mood-icon selectable-icon light-shadow`}
                >
                  <Icon id={icon.id} icons={allIcons} />
                </div>
              ))}
            </div>
            <p className={`${errors.iconId? 'error': "hidden-error" } `}>{errors.iconId}</p>
            </label>
            {/* {errors?.iconId && <p className="error">{errors.iconId}</p>} */}
            <div className="note-form-container">
              <label>Would you like to add a small note to this entry?
                </label>
              <textarea
                className="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <p className={`${errors.note? 'error': "hidden-error" } `}>{errors.note}</p>
            </div>
            {/* {errors?.note && <p className="error">{errors.note}</p>} */}
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
                  {/* {errors?.levels?.[level.id] && (
                    <p className="error">{errors.levels[level.id]}</p>
                  )} */}
                </div>
              ))}
            </div>
            <div className='edit-btn' onClick={(e) => e.preventDefault()}>
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
                    className={`${acts.has(activity.id) ? "selectedAct" : ""} icon selectable-icon light-shadow`}
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
                  modalComponent={<EditActivitiesModal acts={acts} setActs={setActs}/>}
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
