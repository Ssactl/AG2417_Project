import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import BigMap from "./components/BIgMap";
import { useState } from "react";
import Dice from "./components/Dice";
import SmallMap from "./components/SmallMap";

//for testing
const stationLocationArr = [
  [39.920514604261506, 116.39601129456929],
  [31.24615161464742, 121.45993996461581],
  [22.591414849772395, 114.04906736003136],
  [30.655749955405586, 104.0562367934888],
];
const stationCount = stationLocationArr.length;

//玩游戏的页面，放大地图，小地图和人物展示框这三个组件
function App() {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);

  const updateCurrentStation = (newStation) =>
    setCurrentStationIndex(newStation);

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
          currentStationIndex={currentStationIndex}
          stationCount={stationCount}
          updateCurrentStation={updateCurrentStation}
        />
        <BigMap
          currentStationIndex={currentStationIndex}
          stationLocationArr={stationLocationArr}
        />
      </div>
      <div className="column--2">
        <div className="row--1">player display</div>
        <div className="row--2">
          <SmallMap />
        </div>
      </div>
    </div>
  );
}

export default App;
