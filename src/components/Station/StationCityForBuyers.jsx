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
  setStation,
  setCurrentPlayer,
  setCurrentStationIndex,
  playersStationIndex,
  resetStationClass,
}) {
  // if the current player wants to buy the estate
  function buttonYesClickingHandler() {
    //update the score of the owner
    const newPlayers = { ...players };
    newPlayers[currentPlayer].score = players[currentPlayer].score - score;
    setPlayers(newPlayers);
    //if it is the first trade
    if (stations[currentStationIndex].belonger == 0) {
      const newStations = { ...stations };
      newStations[currentStationIndex].belonger == currentPlayer + 1;
      setStations(newStations);
    }
    //update the currentPlayer and the currentStationIndex, it is the next player's turn
    const nextPlayer = (currentPlayer + 1) % 4;
    setCurrentStationIndex(playersStationIndex[nextPlayer]);
    setCurrentPlayer(nextPlayer);
    //reset all the station components
    resetStationClass();
  }
  //if the current player does not want to buy the estate
  function buttonNoClickingHandler() {
    //update the currentPlayer and the currentStationIndex, it is the next player's turn
    const nextPlayer = (currentPlayer + 1) % 4;
    setCurrentStationIndex(playersStationIndex[nextPlayer]);
    setCurrentPlayer(nextPlayer);
    //reset all the station components
    resetStationClass();
  }

  return (
    <div className="station station--city--buyers">
      <div className="station--buyers--column--1">text</div>
      <div className="station--buyers--column--2">
        <div className="station--buyers--column--2--row--1">for image</div>
        <div className="station--buyers--column--2--row--2">
          <p>level 1</p>
          <p>score 200</p>
        </div>
        <div className="station--buyers--column--2--row--3">
          <button className="station--buyers--button station--buyers--button--yes">
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
