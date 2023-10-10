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
    const newPlayers = JSON.parse(JSON.stringify(players));
    const owner = stations[currentStationIndex].belonger - 1; // the owner index
    //update the score of current player/customer and the owner
    newPlayers[currentPlayer].score =
      players[currentPlayer].score -
      score * stations[currentStationIndex].level;
    newPlayers[owner].score =
      players[owner].score + score * stations[currentStationIndex].level;

    // console.log(
    //   "level of current station",
    //   stations[currentStationIndex].level,
    //   ";score of currentPlayer",
    //   players[currentPlayer].score,
    //   ";new score of current player",
    //   newPlayers[currentPlayer].score,
    //   ";score of owner",
    //   players[owner].score,
    //   ";new score of owner",
    //   newPlayers[owner].score
    // );
    setPlayers(newPlayers);

    nextPlayer();
  }

  return (
    <div className="station">
      <p>You spend some money here</p>
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
