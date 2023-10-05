import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
// import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import BigMap from "./components/BigMap/BIgMap";
import Dice from "./components/BigMap/Dice";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import SmallMap from "./components/SmallMap/SmallMap";

//table stations
const stations = [
  {
    id: 0,
    name: "Beijing",
    longitute: 39.920514604261506,
    latitute: 116.39601129456929,
    players: 0,
    level: 0,
  },
  {
    id: 1,
    name: "shanghai",
    longitute: 31.24615161464742,
    latitute: 121.45993996461581,
    players: 0,
    level: 0,
  },
  {
    id: 2,
    name: "shengzheng",
    longitute: 22.591414849772395,
    latitute: 114.04906736003136,
    players: 0,
    level: 0,
  },
  {
    id: 3,
    name: "chengdu",
    longitute: 30.655749955405586,
    latitute: 104.0562367934888,
    players: 0,
    level: 0,
  },
];
const stationCount = stations.length;

// // // Testing;
const players = [
  {
    name: "Jiani1",
    avatar: "../src/assets/player/player1.png", // 头像图片的URL
    score: 1000,
  },
  {
    name: "Lee2",
    avatar: "../src/assets/player/player2.png",
    score: 850,
  },
  {
    name: "Meme3",
    avatar: "../src/assets/player/player3.png",
    score: 1200,
  },
  {
    name: "Viva4",
    avatar: "../src/assets/player/player4.png",
    score: 750,
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
  const playerPositions = [
    [
      cities[player1StationIndex].longitute,
      cities[player1StationIndex].latitute,
    ],
    [
      cities[player2StationIndex].longitute,
      cities[player2StationIndex].latitute,
    ],
    [
      cities[player3StationIndex].longitute,
      cities[player3StationIndex].latitute,
    ],
    [
      cities[player4StationIndex].longitute,
      cities[player4StationIndex].latitute,
    ],
  ];

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
        <Dice
          currentPlayer={currentPlayer}
          playersStationIndex={[
            player1StationIndex,
            player2StationIndex,
            player3StationIndex,
            player4StationIndex,
          ]}
          stationCount={stationCount}
          setplayerStation={[
            setplayer1StationIndex,
            setplayer2StationIndex,
            setplayer3StationIndex,
            setplayer4StationIndex,
          ]}
          updateCurrentStation={updateCurrentStation}
        />
        <BigMap currentStationIndex={currentStationIndex} stations={stations} />
      </div>
      <div className="column--2">
        <div className="row--1">
          <PlayerBoard players={players} />
        </div>
        <div className="row--2">
          <SmallMap playerPositions={playerPositions} />
        </div>
      </div>
    </div>
  );
}

export default App;
