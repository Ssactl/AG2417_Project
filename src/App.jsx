import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
// import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import BigMap from "./components/BigMap/BIgMap";
import Dice from "./components/BigMap/Dice";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import SmallMap from "./components/SmallMap/SmallMap";

import StationCityForBuyers from "./components/Station/StationCityForBuyers";
import StationCityForCustomers from "./components/Station/StationCityForCustomers";
import StationOther from "./components/Station/StationOther";

//table stations
const stations = [
  {
    id: 0,
    name: "Beijing",
    longitute: 39.920514604261506,
    latitute: 116.39601129456929,
    belonger: 0,
    level: 0,
  },
  {
    id: 1,
    name: "shanghai",
    longitute: 31.24615161464742,
    latitute: 121.45993996461581,
    belonger: 0,
    level: 0,
  },
  {
    id: 2,
    name: "shengzheng",
    longitute: 22.591414849772395,
    latitute: 114.04906736003136,
    belonger: 0,
    level: 0,
  },
  {
    id: 3,
    name: "chengdu",
    longitute: 30.655749955405586,
    latitute: 104.0562367934888,
    belonger: 0,
    level: 0,
  },
  {
    id: 4,
    name: "kunming",
    longitute: 24.88558106693481,
    latitute: 102.83097940902874,
    belonger: -9999,
    level: 0,
  },
  {
    id: 5,
    name: "chongqin",
    longitute: 29.56047860181214,
    latitute: 106.5292432576508,
    belonger: 0,
    level: -9999,
  },
];
const stationCount = stations.length;

// // // Testing;
const players = [
  {
    name: "Jiani1",
    avatar: "../src/assets/player/player1.png", // 头像图片的URL
    score: 1000,
    pid: 1,
  },
  {
    name: "Lee2",
    avatar: "../src/assets/player/player2.png",
    score: 850,
    pid: 2,
  },
  {
    name: "Meme3",
    avatar: "../src/assets/player/player3.png",
    score: 1200,
    pid: 3,
  },
  {
    name: "Viva4",
    avatar: "../src/assets/player/player4.png",
    score: 750,
    pid: 4,
  },
];

//玩游戏的页面，放大地图，小地图和人物展示框这三个组件
function App() {
  //the current center of the main/big map
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const updateCurrentStation = (newStation) =>
    setCurrentStationIndex(newStation);

  //the current station of each player
  const [player1StationIndex, setplayer1StationIndex] = useState(0);
  const [player2StationIndex, setplayer2StationIndex] = useState(0);
  const [player3StationIndex, setplayer3StationIndex] = useState(0);
  const [player4StationIndex, setplayer4StationIndex] = useState(0);
  const playersStationIndex = [
    player1StationIndex,
    player2StationIndex,
    player3StationIndex,
    player4StationIndex,
  ];
  const playerPositions = [
    [
      stations[player1StationIndex].longitute,
      stations[player1StationIndex].latitute,
    ],
    [
      stations[player2StationIndex].longitute,
      stations[player2StationIndex].latitute,
    ],
    [
      stations[player3StationIndex].longitute,
      stations[player3StationIndex].latitute,
    ],
    [
      stations[player4StationIndex].longitute,
      stations[player4StationIndex].latitute,
    ],
  ];

  //visibility state for station window
  const [stationClassCustomers, setStationClassCustomers] =
    useState("station--hidden");
  const [stationClassBuyers, setStationClassBuyers] =
    useState("station--hidden");
  const [stationClassOther, setStationClassOther] = useState("station--hidden");
  const updateStationClass = (stations, currentStationIndex) => {
    //if the current station is a non-city one,
    stations[currentStationIndex].level < 0
      ? setStationClassOther("")
      : //if the current station is a city one without any owner, then display the StationCityForBuyers;
      stations[currentStationIndex].level == 0
      ? setStationClassBuyers("")
      : //if the current station is a city and has a owner, but the current player is not the owner
      currentPlayer != stations[currentStationIndex].players
      ? setStationClassCustomers("")
      : //if the current station is a city and has a owner, and the current player is the owner, but the city's level is under 3
      stations[currentStationIndex].level < 3
      ? setStationClassBuyers("")
      : "";
  };
  const resetStationClass = () => {
    setStationClassCustomers("station--hidden");
    setStationClassBuyers("station--hidden");
    setStationClassOther("station--hidden");
  };

  //current player
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // frech players data from postgresql
  // const [players, setPlayers] = useState([]);
  // useEffect(() => {
  //   // 发起GET请求获取数据
  //   axios.get('http://localhost:5000/player/get_players')
  //     .then((response) => {
  //       // 从响应中提取数据
  //       const data = response.data;
  //       console.log(data[0].avater)
  //       // 更新状态变量以存储数据
  //       setPlayers(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []); // 空数组表示仅在组件挂载时执行一次

  return (
    // <Container className="container" fluid="true">
    //   <Row>
    //     <Col xs sm md lg xl xxl className="column--1">
    //       Big Map
    //     </Col>
    //     <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} className="column--2">
    //       <Row xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className="row--1">
    //         Player Display
    //       </Row>
    //       <Row className="row--2">Small Map</Row>
    //     </Col>
    //   </Row>
    // </Container>

    <div className="container">
      <div className="column--1">
        <div className={stationClassCustomers}>
          <StationCityForCustomers />
        </div>
        <div className={stationClassBuyers}>
          <StationCityForBuyers
            players={players}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            setCurrentStationIndex={setCurrentStationIndex}
            resetStationClass={resetStationClass}
            playersStationIndex={playersStationIndex}
          />
        </div>
        <div className={stationClassOther}>
          <StationOther />
        </div>

        <Dice
          currentPlayer={currentPlayer}
          playersStationIndex={playersStationIndex}
          stationCount={stationCount}
          setplayerStation={[
            setplayer1StationIndex,
            setplayer2StationIndex,
            setplayer3StationIndex,
            setplayer4StationIndex,
          ]}
          updateCurrentStation={updateCurrentStation}
          stations={stations}
          currentStationIndex={currentStationIndex}
          updateStationClass={updateStationClass}
        />
        <BigMap currentStationIndex={currentStationIndex} stations={stations} />
      </div>
      <div className="column--2">
        <div className="row--1">
          <PlayerBoard players={players} currentPlayer={currentPlayer} />
        </div>
        <div className="row--2">
          <SmallMap playerPositions={playerPositions} />
        </div>
      </div>
    </div>
  );
}

export default App;
