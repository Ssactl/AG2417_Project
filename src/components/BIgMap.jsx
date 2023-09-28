//底图
//站点
//游戏路线（不确定如何实现）
//人物位置 从player拿
//骰子

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function BigMap() {
  return (
    <>
      <div>
        <MapContainer center={{ lat: 48.71291, lng: 44.52693 }} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  );
}

export default BigMap;
