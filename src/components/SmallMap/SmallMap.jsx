//底图
//4个人物位置 从player拿

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  Circle,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import PlayerMarker from "./PlayerMarker";

//playerPositions: a list of player positions
function SmallMap({ playerPositions, stations }) {
  return (
    <MapContainer
      center={[35.03956537837425, 103.4895297672369]}
      zoom={3}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* add circles */}
      {stations.map((station, index) => (
        <Circle
          key={index}
          center={[station.latitude, station.longitude]}
          pathOptions={{ color: "red", fillColor: "red" }}
          radius={2000} // 设置圆的半径（以米为单位）
        />
      ))}

      {/* 添加连接线，确保头尾相连 */}
      <Polyline
        positions={[
          ...stations.map((station) => [station.latitude, station.longitude]),
          [stations[0].latitude, stations[0].longitude],
        ]}
        pathOptions={{ color: "green", dashArray: "10, 10" }}
      />

      {playerPositions.map((p, index) => (
        <PlayerMarker position={p} index={index} key={index} />
      ))}
    </MapContainer>
  );
}

export default SmallMap;
