function Levels({ levels }) {
  return (
    <>
      {levels.map((level) => (
        <div>
          <p>{level.name}</p>
          <div>{level.EntryLevel.rating}</div>
        </div>
      ))}
    </>
  );
}

export default Levels;
