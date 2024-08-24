import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMoodIcons } from "../../../redux/icons";
import { Icon } from "../../subcomponents";
import "./CreateEntry.css";

function CreateEntryPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd HH:mm"));
  const [mood, setMood] = useState("");
  const [overallMood, setOverallMood] = useState("");
  const [selectedIcon, setSelectedIcon] = useState({});
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({})

  console.log("selected icon", ...new Array(10));

  const moodIconsObj = useSelector((state) => state.icons.moodIcons);
  const moodIcons = moodIconsObj ? Object.values(moodIconsObj) : [];
  console.log(moodIcons);

  useEffect(() => {
    if (!moodIconsObj) {
      dispatch(getMoodIcons());
    }
  }, [dispatch, moodIconsObj]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrors({})

    const payload = {
        datetime: date,
        mood,
        overallMood,
        iconId: selectedIcon.id,
        note
    }

    console.log('payload', payload)


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
          <label>In one word, how are you feeling?</label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
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
          <label>Choose an icon that best represents your mood:</label>
          <div>
            {moodIcons.map((icon) => (
              <div
                key={icon.id}
                onClick={() => setSelectedIcon(icon)}
                className={`${icon.id === selectedIcon.id ? "selected" : ""}`}
              >
                <Icon id={icon.id} icons={moodIconsObj} />
              </div>
            ))}
          </div>
          <label>Would you like to add a small note to this entry?</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}

export default CreateEntryPage;
