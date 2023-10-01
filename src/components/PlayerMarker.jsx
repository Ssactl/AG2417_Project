//A customized marker on small map for displaying the positsion of player

import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import customMarkerIcon from "./../assets/dice6.png"; // 导入自定义标记图片
import { useEffect } from "react";

function PlayerMarker({ position }) {
  // const markerStyle = {
  //   width: "30px",
  //   height: "30px",
  //   backgroundColor: "blue", // 设置背景色
  //   border: "2px solid red", // 设置边框样式
  //   borderRadius: "50%", // 圆角边框，使其看起来像方框
  // };

  const playerIcon = new L.Icon({
    iconUrl: customMarkerIcon, // 图标的 URL
    iconSize: [40, 40], // 图标大小
    iconAnchor: [20, 40], // 图标的锚点位置
    popupAnchor: [0, -40], // 弹出窗口的锚点位置
  });

  return (
    <Marker position={position} icon={playerIcon}>
      {/* 在这里可以放置自定义的标记内容，例如图标、文本等 */}
      {/* <div style={markerStyle}></div> */}
    </Marker>
  );
}

export default PlayerMarker;
