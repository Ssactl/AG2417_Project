import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function PlayerEstateBoard({
  stations,
  playerDisplayEstate,
  players,
  setplayerDisplayEstateHidden,
}) {
  function buttonExitClickingHandler() {
    setplayerDisplayEstateHidden("player--estate--hidden");
  }
  return (
    <div className="player--estate--container">
      <div className="player--estate--name">
        {players[playerDisplayEstate].name}
      </div>
      <button
        className="player--estate--exit"
        onClick={buttonExitClickingHandler}
      >
        X
      </button>
      <MapContainer
        center={[35.03956537837425, 103.4895297672369]}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((data, index) =>
          data.belonger === playerDisplayEstate + 1 ? (
            <Marker position={[data.latitude, data.longitude]} key={index} />
          ) : (
            ""
          )
        )}
      </MapContainer>
    </div>
  );
}
export default PlayerEstateBoard;
