import "./Levels.css";

function Levels({ levels, entryLvls }) {
  return (
    <>
      {entryLvls.map((lvl) => (
        <>
          {levels[lvl.levelId] ? (
            <div key={lvl.levelId} className="level">
              <p className="lvl-name">{levels[lvl.levelId].name}:</p>
              <div className="rating">{lvl.rating}</div>
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </>
  );
}

export default Levels;
