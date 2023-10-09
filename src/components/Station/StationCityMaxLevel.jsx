import "./StationCity.css";

function StationClassMaxLevel({ nextPlayer }) {
  function buttonOkClikingHandler() {
    nextPlayer();
  }
  return (
    <div className="station">
      <p>You city reachs the MAX LEVEL!!!!</p>
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
