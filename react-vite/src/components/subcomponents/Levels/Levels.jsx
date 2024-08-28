function Levels({ levels, entryLvls}) {
  return (
    <>
      {entryLvls.map((lvl) => {
        levels[lvl.levelId]?
      (<div key={lvl.levelId}>
          <p>{levels[lvl.levelId].name}</p>
          <div>{lvl.rating}</div>
        </div>) : ""
      })}
    </>
  );
}

export default Levels;
