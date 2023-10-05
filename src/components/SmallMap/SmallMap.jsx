//底图
//4个人物位置 从player拿

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import PlayerMarker from "./PlayerMarker";

//playerPositions: a list of player positions
function SmallMap({ playerPositions }) {
  return (
    <MapContainer
      center={[35.03956537837425, 103.4895297672369]}
      zoom={3}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {playerPositions.map((p, index) => (
        <PlayerMarker position={p} index={index} key={index} />
      ))}
    </MapContainer>
  );
}

export default SmallMap;
