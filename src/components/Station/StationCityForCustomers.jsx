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
  levelfeatures,
}) {
  if (stations[currentStationIndex].level < 0) return null;

  //list of all levels of the current station
  const stationlevels = levelfeatures.filter(
    (data) => data.cid == stations[currentStationIndex].cid
  );

  const currentLevelFeature =
    stationlevels[stations[currentStationIndex].level];

  function buttonOkClickingHandler() {
    const newPlayers = JSON.parse(JSON.stringify(players));
    const owner = stations[currentStationIndex].belonger - 1; // the owner index
    //update the score of current player/customer and the owner
    newPlayers[currentPlayer].score =
      players[currentPlayer].score - currentLevelFeature.scoreFine;
    newPlayers[owner].score =
      players[owner].score + currentLevelFeature.scoreFine;

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
    <div className="station--customer">
      <div className="station--customer--div">
      
      {stations[currentStationIndex].belonger > 0 && (
        <h2>{currentLevelFeature.fname}
        <b>
          Owner: {players[stations[currentStationIndex].belonger - 1].name}
        </b>
        </h2>
      )}
      <p>
        You spend {currentLevelFeature.scoreFine} in{" "}
        <b>{currentLevelFeature.cname}</b> for
      </p>
      {stationlevels.map((levelFeatrue, index) =>
        levelFeatrue.level <= stations[currentStationIndex].level ? (
          <p key={index}>{levelFeatrue.textFine}</p>
        ) : (
          ""
        )
      )}
      <button
        className="station--customer--button--ok"
        onClick={buttonOkClickingHandler}
      >
        ok
      </button>
      </div>
    </div>
  );
}

export default StationCityForCustomers;
