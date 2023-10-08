import React from "react";
import { Card, Image, Container, Row, Col } from "react-bootstrap";
import "./PlayerBoard.css";
//一个playerInfo框
//头像 image
//分数 一个state 从数据库拿
//位置 一个state 这里的位置改后实时反映到小地图和大地图 读取的数据库里的城市位置
//所拥有城市
//需要的功能：

//PlayerBoard组件接受一个名为players的属性，该属性是一个包含玩家信息的数组。
//在render方法中，我们使用map函数遍历players数组，为每个玩家创建一个Card组件，显示玩家的头像、名字和分数
const PlayerBoard = ({ players, currentPlayer }) => {
  return (
    <>
      <Row xs={2} md={3}>
        {players.map((player, index) => (
          <Col key={index} md={5}>
            <Card
              style={{ width: "100%" }}
              className={
                currentPlayer + 1 == player.pid ? "current--player" : ""
              }
            >
              <Card.Body
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card.Img
                  variant="top"
                  src={player.avatar}
                  alt={`${player.name}'s Avatar`}
                  style={{ width: "40%", height: "60%" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <Card.Title>{player.name}</Card.Title>
                  <Card.Text>score: {player.score}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PlayerBoard;
