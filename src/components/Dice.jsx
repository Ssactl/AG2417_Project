import { useState } from "react";
import dice1ImgURL from "./../assets/dice1.png";
import dice2ImgURL from "./../assets/dice2.png";
import dice3ImgURL from "./../assets/dice3.png";
import dice4ImgURL from "./../assets/dice4.png";
import dice5ImgURL from "./../assets/dice5.png";
import dice6ImgURL from "./../assets/dice6.png";

const diceImgURLArr = [
  dice1ImgURL,
  dice2ImgURL,
  dice3ImgURL,
  dice4ImgURL,
  dice5ImgURL,
  dice6ImgURL,
];

//需要从App.js传过来的参数是：当前地图的位置currentStationIndex，站数总数stationCount，位置state的更新函数updateCurrentStation
function Dice({ currentStationIndex, stationCount, updateCurrentStation }) {
  const [currentDiceURL, setCurrentDiceURL] = useState(dice1ImgURL);

  //函数作用：当用户点击骰子，根据骰子点数计算移动步数，更新当前站点位置
  const diceClickingHandler = () => {
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    // console.log(diceNumber);

    //update currant station of the big map
    let newStationIndex = (currentStationIndex + diceNumber) % stationCount;
    updateCurrentStation(newStationIndex);

    //update dice image
    setCurrentDiceURL(diceImgURLArr[diceNumber - 1]);
    // console.log(currentDiceURL);

    alert(`Moving forward ${diceNumber} steps!!!`);
  };

  return (
    <div className="dice" onClick={diceClickingHandler}>
      <img src={currentDiceURL} className="image"></img>
    </div>
  );
}

export default Dice;
