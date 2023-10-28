import "./StationCity.css";

function StationClassMaxLevel({ nextPlayer }) {
  function buttonOkClikingHandler() {
    nextPlayer();
  }
  return (
    <div className="station--max-level">
      <p>Your city has reaches the MAX LEVEL.</p>
      <button
        className="station--customer--button--ok"
        onClick={buttonOkClikingHandler}
      >
        ok
      </button>
    </div>
  );
}

export default StationClassMaxLevel;
