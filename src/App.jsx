import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//玩游戏的页面，放大地图，小地图和人物展示框这三个组件
function App() {
  return (
    <Container fluid>
      <Col>Big Map</Col>
      <Col>
        <Row>Player Display</Row>
        <Row>Small Map</Row>
      </Col>
    </Container>
  );
}

export default App;
