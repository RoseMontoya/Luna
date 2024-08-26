function Levels({ levels }) {
  return (
    <>
      {levels.map((level) => (
        <div key={level.id}>
          <p>{level.name}</p>
          <div>{level.EntryLevel.rating}</div>
        </div>
      ))}
    </>
  );
}

export default Levels;
