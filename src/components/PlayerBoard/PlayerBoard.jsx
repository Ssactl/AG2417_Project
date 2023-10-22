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
const PlayerBoard = ({
  players,
  currentPlayer,
  setPlayerDisplayEstate,
  setplayerDisplayEstateHidden,
}) => {
  function displayPlayerAllCollection(player) {
    // console.log(player.pid - 1);
    //indicate which player click that button
    setPlayerDisplayEstate(player.pid - 1);
    //show the player estate board
    setplayerDisplayEstateHidden("");
  }

  return (
    <>
      {players.map((player, index) => (
        <div
          key={index}
          className={
            currentPlayer + 1 == player.pid
              ? "current--player player--board--item"
              : "player--board--item"
          }
        >
          <img
            className="player--board--item--column--1"
            src={player.avatar}
            alt={`${player.name}'s Avatar`}
          />
          <div className="player--board--item--column--2">
            <p className="player--name">{player.name}</p>
            <p>{player.score}</p>
            <button onClick={() => displayPlayerAllCollection(player)}>
              collection
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
