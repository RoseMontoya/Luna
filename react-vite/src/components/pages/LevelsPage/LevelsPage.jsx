// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component/Redux Imports
import { LevelInput } from "../../modals";
import { getAllLevels } from "../../../redux";
import { Loading } from "../../subcomponents";
import { useNav } from "../../../context/navContext";

import "../../modals/LevelModals/LevelModal.css";

function LevelsPage() {
  const dispatch = useDispatch();
  const { navOpen } = useNav();

  const user = useSelector((state) => state.session.user);
  const levelsObj = useSelector((state) => state.levels.allLevels);
  const levels = levelsObj ? Object.values(levelsObj) : [];
  const [lvls, setLvls] = useState(levels || []);
  const [selected, setSelected] = useState(""); // Keep track of which level is enabled for editting

  useEffect(() => {
    if (!levelsObj) {
      dispatch(getAllLevels()).then((res) => {
        setLvls(Object.values(res));
      });
    }
  }, [dispatch, levelsObj]);

  // If no there is no user logged in, navigate to home page
  if (!user) return <Navigate to="/" replace={true} />;
  // If info hasn't loaded in, return loading component
  if (!levelsObj) return <Loading />;

  const handleClick = () => {
    // Give new level a temporary id and add in level to lvls state
    const newLvl = [...lvls, { id: lvls[lvls.length - 1].id + 1 }];
    setLvls(newLvl);
    // Set new level as selected so it is editable
    setSelected(lvls[lvls.length - 1].id + 1);
  };

  return (
    <main className={`${navOpen ? "nav-open" : ""}`}>
      <h1>Levels</h1>
      <div className="entries-container">
        <div id="levels-edit">
          <div className="container">
            <div id="lvl-head" className="border-bottom">
              <button
                style={{ fontSize: "16px", padding: "0 5px" }}
                onClick={handleClick}
              >
                Add level
              </button>
            </div>
            <ul>
              {lvls.map((level, idx) => (
                <li key={level.id}>
                  <LevelInput
                    levelsObj={levelsObj}
                    selected={selected}
                    setSelected={setSelected}
                    level={level}
                    idx={idx}
                    lvls={lvls}
                    setLvls={setLvls}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LevelsPage;
