import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllIcons } from "../../../redux/icons";
import { Icon, Loading } from "../../subcomponents";
import "./CreateEntry.css";
import { createEntry } from "../../../redux/entries";
import { getAllLevels } from "../../../redux/levels";
import { getAllActivities } from "../../../redux/activities";

function CreateEntryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd HH:mm"));
  const [mood, setMood] = useState("");
  const [overallMood, setOverallMood] = useState("");
  const [selectedIcon, setSelectedIcon] = useState({});
  const [note, setNote] = useState("");
  const [levelRatings, setLevelsRating] = useState({});
  const [acts, setActs] = useState(new Set());
  const [errors, setErrors] = useState({});

  const allIcons = useSelector((state) => state.icons.allIcons);
  const icons = allIcons ? Object.values(allIcons) : [];
  const moodIcons = icons.slice(0, 5);
  const levelsObj = useSelector((state) => state.levels.allLevels);
  const levels = levelsObj ? Object.values(levelsObj) : [];
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
  }, [dispatch, allIcons, levelsObj, activitiesObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const lvls = []
    for (const [levelId, rating] of Object.entries(levelRatings)) {
        lvls.push({ 'levelId': Number(levelId), 'rating': Number(rating) })
    }

    const entriesActs = []
    for (const actId of acts.values()) {
        entriesActs.push({ activityId: Number(actId) })
    }

    const payload = {
      datetime: date,
      mood,
      overallMood,
      iconId: selectedIcon.id,
      note,
      levels: lvls,
      activities: entriesActs
    };

    dispatch(createEntry(payload))
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
        const newA = new Set(acts)
        newA.delete(actId)
        setActs(newA)
    } else {
        const newA = new Set(acts)
        setActs(newA.add(actId))
    }
  }

  return (
    <main className="nav-open">
      <div style={{ padding: "4em 0" }}>
        <form
          className="container"
          style={{ padding: "2em 4em" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>How are you?</h1>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors?.datetime && <p className="error">{errors.datetime}</p>}
          <div>
            <label>In one word, how are you feeling?</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            {errors?.mood && <p className="error">{errors.mood}</p>}
            <label>{`On a scale of 1 to 10, how would rating your overall mood?`}</label>
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
            {errors?.overallMood && (
              <p className="error">{errors.overallMood}</p>
            )}
            <label>Choose an icon that best represents your mood:</label>
            <div>
              {moodIcons.map((icon) => (
                <div
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon)}
                  className={`${icon.id === selectedIcon.id ? "selected" : ""}`}
                >
                  <Icon id={icon.id} icons={allIcons} />
                </div>
              ))}
            </div>
            {errors?.iconId && <p className="error">{errors.iconId}</p>}
            <label>Would you like to add a small note to this entry?</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            {errors?.note && <p className="error">{errors.note}</p>}
          </div>
          <div>
            <h2>Levels</h2>
            {levels.map((level) => (
              <div key={level.id}>
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
          <div>
            {activities.map(activity => (
                <div key={activity.id}>
                    <div onClick={() => handleSelect(activity.id)} className={`${acts.has(activity.id)? 'selectedAct' : ''}`}>
                        <Icon icons={allIcons} id={activity.iconId}/>
                    </div>
                    <p>{activity.name}</p>
                </div>
            ))}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}

export default CreateEntryPage;
