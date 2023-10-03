import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import BigMap from "./components/BigMap/BIgMap";
import Dice from "./components/BigMap/Dice";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import SmallMap from "./components/SmallMap/SmallMap";

//for testing
const stationLocationArr = [
  [39.920514604261506, 116.39601129456929],
  [31.24615161464742, 121.45993996461581],
  [22.591414849772395, 114.04906736003136],
  [30.655749955405586, 104.0562367934888],
];
const stationCount = stationLocationArr.length;

// Testing
// const players = [
//   {
//     name: 'Jiani1',
//     avatar: "../src/assets/player/player1.png", // 头像图片的URL
//     score: 1000,
//   },
//   {
//     name: 'Lee2',
//     avatar: "../src/assets/player/player2.png",
//     score: 850,
//   },
//   {
//     name: 'Meme3',
//     avatar: "../src/assets/player/player3.png",
//     score: 1200,
//   },
//   {
//     name: 'Viva4',
//     avatar: "../src/assets/player/player4.png",
//     score: 750,
//   },
// ];


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
    stationLocationArr[player1StationIndex],
    stationLocationArr[player2StationIndex],
    stationLocationArr[player3StationIndex],
    stationLocationArr[player4StationIndex],
  ];

  //current player
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // 定义用于存储玩家数据的状态
  const [players, setPlayers] = useState([]);

  // 使用 useEffect 来获取玩家数据并更新状态
  useEffect(() => {
    fetch('/api/players') // 向后端路由发送请求
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data); // Update state with player data
      })
      .catch((error) => console.error('Error fetching players', error));
  }, []); // 空数组表示仅在组件加载时执行一次

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
        <BigMap
          currentStationIndex={currentStationIndex}
          stationLocationArr={stationLocationArr}
        />
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
