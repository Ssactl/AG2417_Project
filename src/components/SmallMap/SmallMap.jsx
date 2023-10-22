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
      center={[35.75383411159672, 113.10072042038098]}
      zoom={4}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />

      {/* <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/ssactl99/clo1g6z1a00e701qxb75o3bvw/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A`}
      /> */}
      <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/ssactl99/clo1eyfuz00g901pf8a0ybguu/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A`}
      />
      {/* <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/ssactl99/clo1iknhd00ah01qx55s979z3/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A`}
      /> */}

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
