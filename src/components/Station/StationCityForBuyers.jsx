//城市点
//功能点

//testing
const score = 200; //stations[currentStationIndex]-level-score

//parameters:players,setPlayers(),currentPlayer,stations,currentStationIndex,setStations(),setCurrentPlayer(),setCurrentStationIndex(),playersStationIndex,resetStationClass()
function StationCityForBuyers(props) {
  // if the current player wants to buy the estate
  function buttonYesClickingHandler() {
    //update the score of the owner
    const newPlayers = { ...props.players };
    newPlayers[currentPlayer].score =
      props.players[currentPlayer].score - score;
    props.setPlayers(newPlayers);
    //if it is the first trade
    if (props.stations[props.currentStationIndex].belonger == 0) {
      const newStations = { ...props.stations };
      newStations[props.currentStationIndex].belonger ==
        props.currentPlayer + 1;
      props.setStations(newStations);
    }
    //update the currentPlayer and the currentStationIndex, it is the next player's turn
    const nextPlayer = (currentPlayer + 1) % 4;
    props.setCurrentStationIndex(playersStationIndex[nextPlayer]);
    props.setCurrentPlayer(nextPlayer);
    //reset all the station components
    props.resetStationClass();
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
          <button className="station--buyers--button station--buyers--button--no">
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default StationCityForBuyers;
