//城市点
//功能点
import "./StationCity.css";
import { useEffect } from "react";

//testing
const score = 200;

//parameters: stations,currentStationIndex,players,setPlayers
function StationCityForCustomers({
  stations,
  currentStationIndex,
  players,
  setPlayers,
  nextPlayer,
  currentPlayer,
  playersStationIndex,
  setCurrentStationIndex,
  setCurrentPlayer,
  stationClassCustomers,
  resetStationClass,
}) {
  function buttonOkClikingHandler() {
    const newPlayers = { ...players };
    const owner = stations[currentStationIndex].belonger; // the owner index
    //update the score of current player/customer and the owner
    newPlayers[currentPlayer].score = players[currentPlayer].score - score;
    newPlayers[owner].score = players[owner].score + score;
    // setPlayers(newPlayers);

    nextPlayer();
  }

  return (
    <div className="station">
      <button
        className="station--customer--button--ok"
        onClick={buttonOkClikingHandler}
      >
        ok
      </button>
    </div>
  );
}

export default StationCityForCustomers;
