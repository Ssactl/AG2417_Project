import { useState } from "react";
import dice1ImgURL from "../../assets/dice/dice1.png";
import dice2ImgURL from "../../assets/dice/dice2.png";
import dice3ImgURL from "../../assets/dice/dice3.png";
import dice4ImgURL from "../../assets/dice/dice4.png";
import dice5ImgURL from "../../assets/dice/dice5.png";
import dice6ImgURL from "../../assets/dice/dice6.png";
import "./Dice.css";

const diceImgURLArr = [
  dice1ImgURL,
  dice2ImgURL,
  dice3ImgURL,
  dice4ImgURL,
  dice5ImgURL,
  dice6ImgURL,
];

//需要从App.js传过来的参数是：当前玩家currentPlayer，所有玩家的位置playersStationIndex，站数总数stationCount，玩家位置更新函数setplayerStation，大地图中心位置的更新函数updateCurrentStation
function Dice({
  currentPlayer,
  playersStationIndex,
  stationCount,
  setplayerStation,
  updateCurrentStation,
  stations,
  currentStationIndex,
  updateStationClass,
}) {
  const [currentDiceURL, setCurrentDiceURL] = useState(dice1ImgURL);

  //函数作用：当用户点击骰子，根据骰子点数计算移动步数，更新站点位置
  const diceClickingHandler = () => {
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    // console.log(diceNumber);

    //update currant player station
    let newStationIndex =
      (playersStationIndex[currentPlayer] + diceNumber) % stationCount;
    setplayerStation[currentPlayer](newStationIndex);

    //update currant center of the big map
    updateCurrentStation(newStationIndex);

    //update dice image
    setCurrentDiceURL(diceImgURLArr[diceNumber - 1]);
    // console.log(currentDiceURL);

    alert(`Moving forward ${diceNumber} steps!!!`);

    updateStationClass(stations, currentStationIndex);
  };

  return (
    <div className="dice" onClick={diceClickingHandler}>
      <img src={currentDiceURL} className="image"></img>
    </div>
  );
}

export default Dice;
