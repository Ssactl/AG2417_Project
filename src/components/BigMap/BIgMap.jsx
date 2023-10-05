//底图
//站点
//游戏路线（不确定如何实现）
//人物位置 从player拿
//骰子

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

function BigMap({ currentStationIndex, stations }) {
  const mapRef = useRef(); //refer to map
  const zoom = 13;

  // console.log(stations);

  //when the currentStationIndex updates, move the map to the new center
  useEffect(() => {
    if (mapRef.current) {
      // mapRef.current.setView(stationLocationArr[currentStationIndex], zoom);
      mapRef.current.panTo([
        stations[currentStationIndex].longitute,
        stations[currentStationIndex].latitute,
      ]);
    }
  }, [currentStationIndex]);

  return (
    <MapContainer
      ref={mapRef}
      center={[
        stations[currentStationIndex].longitute,
        stations[currentStationIndex].latitute,
      ]}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default BigMap;
