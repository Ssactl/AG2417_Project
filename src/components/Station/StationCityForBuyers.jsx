//城市点
//功能点

//testing
const score = 200; //stations[currentStationIndex]-level-score

//parameters:players,setPlayers,currentPlayer,stations,currentStationIndex,setStations,setCurrentPlayer,setCurrentStationIndex,playersStationIndex,resetStationClass
function StationCityForBuyers({
  players,
  setPlayers,
  currentPlayer,
  stations,
  currentStationIndex,
  setStations,
  setCurrentPlayer,
  setCurrentStationIndex,
  playersStationIndex,
  resetStationClass,
  nextPlayer,
  levelfeatures,
}) {
  const stationlevels = levelfeatures.filter(
    (data) => data.cid == stations[currentStationIndex].cid
  );
  const currentLevelFeature =
    stationlevels[stations[currentStationIndex].level];

  console.log(currentLevelFeature);

  // if the current player wants to buy the estate
  function buttonYesClickingHandler() {
    //update the score of the owner
    const newPlayers = JSON.parse(JSON.stringify(players));
    newPlayers[currentPlayer].score =
      players[currentPlayer].score - currentLevelFeature.scoreBuy;
    setPlayers(newPlayers);

    //update the level of the station
    const newStations = JSON.parse(JSON.stringify(stations));
    newStations[currentStationIndex].level =
      stations[currentStationIndex].level + 1;
    //if it is the first trade, update the belonger
    if (stations[currentStationIndex].belonger == 0) {
      newStations[currentStationIndex].belonger = currentPlayer + 1;
    }
    setStations(newStations);
    nextPlayer();
  }
  //if the current player does not want to buy the estate
  function buttonNoClickingHandler() {
    nextPlayer();
  }

  return (
    <div className="station station--city--buyers">
      <div className="station--buyers--column--1">text</div>
      <div className="station--buyers--column--2">
        <div className="station--buyers--column--2--row--1">for image</div>
        <div className="station--buyers--column--2--row--2">
          <p>{currentLevelFeature.textBuy}</p>
          <p>{currentLevelFeature.scoreBuy}</p>
        </div>
        <div className="station--buyers--column--2--row--3">
          <button
            className="station--buyers--button station--buyers--button--yes"
            onClick={buttonYesClickingHandler}
          >
            yes
          </button>
          <button
            className="station--buyers--button station--buyers--button--no"
            onClick={buttonNoClickingHandler}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default StationCityForBuyers;
