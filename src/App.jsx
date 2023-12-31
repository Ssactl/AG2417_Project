import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import BigMap from "./components/BigMap/BIgMap";
import Dice from "./components/BigMap/Dice";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import SmallMap from "./components/SmallMap/SmallMap";
import StationCityForBuyers from "./components/Station/StationCityForBuyers";
import StationCityForCustomers from "./components/Station/StationCityForCustomers";
import StationOther from "./components/Station/StationOther";
import StationClassMaxLevel from "./components/Station/StationCityMaxLevel";
import PlayerEstateBoard from "./components/PlayerEstate/PlayerEstateBoard";
import { render } from "react-dom";

// //table stations
//id starts from 0
const stationsTest = [
  // {
  //   cid: 0,
  //   name: "Beijing",
  //   latitude: 39.920514604261506,
  //   longitude: 116.39601129456929,
  //   belonger: 1,
  //   level: 1,
  // },
  {
    cid: 1,
    name: "qindao",
    latitude: 36.07703215,
    longitude: 120.3325006,
    belonger: 0,
    level: 0,
  },
  // {
  //   cid: 2,
  //   name: "shengzheng",
  //   latitude: 22.591414849772395,
  //   longitude: 114.04906736003136,
  //   belonger: 1,
  //   level: 1,
  // },
  // {
  //   cid: 3,
  //   name: "chengdu",
  //   latitude: 30.655749955405586,
  //   longitude: 104.0562367934888,
  //   belonger: 1,
  //   level: 3,
  // },
  // {
  //   cid: 4,
  //   name: "kunming",
  //   latitude: 24.88558106693481,
  //   longitude: 102.83097940902874,
  //   belonger: 1,
  //   level: 1,
  // },
  // {
  //   cid: 5,
  //   name: "chongqin",
  //   latitude: 29.56047860181214,
  //   longitude: 106.5292432576508,
  //   belonger: 1,
  //   level: 1,
  // },
];
// // const stationCount = stations.length;

// // // // Testing;
// const playersTest = [
//   {
//     name: "Jiani1",
//     avatar: "../src/assets/player/player1.png", // 头像图片的URL
//     score: 1000,
//     pid: 1,
//   },
//   {
//     name: "Lee2",
//     avatar: "../src/assets/player/player2.png",
//     score: 850,
//     pid: 2,
//   },
//   {
//     name: "Meme3",
//     avatar: "../src/assets/player/player3.png",
//     score: 1200,
//     pid: 3,
//   },
//   {
//     name: "Viva4",
//     avatar: "../src/assets/player/player4.png",
//     score: 750,
//     pid: 4,
//   },
// ];

//testing
const levelfeaturesTest = [
  {
    fid: 1,
    cid: 1,
    cname: "qindao",
    fname: "Laoshan Mountain",
    longitude: 120.3325006,
    latitude: 36.07703215,
    level: 1,
    categories: "Cultural",
    textBuy: "Explore Shanghai's modern cultural scene.",
    scoreBuy: 4000,
    textFine: "Attend a cultural exhibition.",
    scoreFine: 1100,
    placeID: "ChIJV1SA0WeZ8DURiRkz9Mq0YKM",
  },
  {
    fid: 1,
    cid: 1,
    cname: "shanghai",
    fname: "Laoshan Mountain",
    longitude: 121.4694399,
    latitude: 31.23339301,
    level: 2,
    categories: "Cuisine",
    textBuy: "Explore Shanghai's modern cultural scene.",
    scoreBuy: 2700,
    textFine: "Attend a cultural exhibition.",
    scoreFine: 1100,
    placeID: "ChIJV1SA0WeZ8DURiRkz9Mq0YKM",
  },
  {
    fid: 1,
    cid: 1,
    cname: "shanghai",
    fname: "Laoshan Mountain",
    longitude: 121.4694399,
    latitude: 31.23339301,
    level: 3,
    categories: "Cuisine",
    textBuy: "Explore Shanghai's modern cultural scene.",
    scoreBuy: 2700,
    textFine: "Attend a cultural exhibition.",
    scoreFine: 1100,
    placeID: "ChIJV1SA0WeZ8DURiRkz9Mq0YKM",
  },
];

//玩游戏的页面，放大地图，小地图和人物展示框这三个组件
function App() {
  // frech players data from postgresql
  const [players, setPlayers] = useState(null);
  // const [stations, setStations] = useState(stationsTest);
  const [stations, setStations] = useState(null);
  // const [levelfeatures, setLevelfeatures] = useState(levelfeaturesTest);
  const [levelfeatures, setLevelfeatures] = useState(null);

  useEffect(() => {
    console.log("loading data!");
    axios
      .all([
        // axios.get("http://localhost:5000/player/get_players"),
        // axios.get("http://localhost:5000/stations/get_stations"),
        // axios.get("http://localhost:5000/level/levelfeatures"),
        axios.get("http://130.237.64.7:5000/player/get_players"),
        axios.get("http://130.237.64.7:5000/stations/get_stations"),
        axios.get("http://130.237.64.7:5000/level/levelfeatures"),
      ])
      .then(
        axios.spread(
          (playersResponse, stationsResponse, levelfeaturesResponse) => {
            // 提取数据
            const playersData = playersResponse.data;
            const stationsData = stationsResponse.data;
            const levelfeaturesData = levelfeaturesResponse.data;

            // 更新状态变量以存储数据
            setPlayers(playersData);
            setStations(stationsData);
            setLevelfeatures(levelfeaturesData);
          }
        )
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // 空数组表示仅在组件挂载时执行一次

  //the current center of the main/big map
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const updateCurrentStation = (newStation) =>
    setCurrentStationIndex(newStation);

  //the current station of each player
  const [player1StationIndex, setplayer1StationIndex] = useState(0);
  const [player2StationIndex, setplayer2StationIndex] = useState(0);
  const [player3StationIndex, setplayer3StationIndex] = useState(0);
  const [player4StationIndex, setplayer4StationIndex] = useState(0);
  const playersStationIndex = [
    player1StationIndex,
    player2StationIndex,
    player3StationIndex,
    player4StationIndex,
  ];

  //visibility state for station window
  const [stationClassCustomers, setStationClassCustomers] =
    useState("station--hidden");
  const [stationClassBuyers, setStationClassBuyers] =
    useState("station--hidden");
  const [stationClassOther, setStationClassOther] = useState("station--hidden");
  const [stationClassMaxLevel, setStationClassMaxLevel] =
    useState("station--hidden");
  const stationClassList = [
    stationClassCustomers,
    stationClassBuyers,
    stationClassOther,
    stationClassMaxLevel,
  ];
  console.log(stationClassList);
  const updateStationClass = (stations, currentStationIndex) => {
    // //for debugging
    // console.log(
    //   stations[currentStationIndex].name,
    //   "belonger is",
    //   players[stations[currentStationIndex].belonger - 1].name
    // );
    // console.log("current player is", players[currentPlayer].name);

    //if the current station is a fate/chance card
    if (stations[currentStationIndex].belonger === -99999) {
      // Do nothing
    } else if (stations[currentStationIndex].belonger === -88888) {
      setStationClassOther("");
    } else if (stations[currentStationIndex].belonger === 0) {
      //if the current station is a city one without any owner, then display the StationCityForBuyers;
      setStationClassBuyers("");
    } else if (currentPlayer + 1 !== stations[currentStationIndex].belonger) {
      //if the current station is a city and has a owner, but the current player is not the owner
      setStationClassCustomers("");
    } else if (stations[currentStationIndex].level < 3) {
      //if the current station is a city and has a owner, and the current player is the owner, but the city's level is under 3
      setStationClassBuyers("");
    } else {
      //if the station reach the max level
      setStationClassMaxLevel("");
    }
  };
  const resetStationClass = () => {
    setStationClassCustomers("station--hidden");
    setStationClassBuyers("station--hidden");
    setStationClassOther("station--hidden");
    setStationClassMaxLevel("station--hidden");
  };

  //current player
  const [currentPlayer, setCurrentPlayer] = useState(0);

  //player who wants to display his all estate
  const [playerDisplayEstate, setPlayerDisplayEstate] = useState(0);
  const [playerDisplayEstateHidden, setplayerDisplayEstateHidden] = useState(
    "player--estate--hidden"
  );

  //the next player's turn
  function nextPlayer() {
    //update the currentPlayer and the currentStationIndex
    const nextPlayer = (currentPlayer + 1) % 4;
    setCurrentStationIndex(playersStationIndex[nextPlayer]);
    setCurrentPlayer(nextPlayer);
    //reset all the station components
    resetStationClass();
  }

  //initiate map
  const mapRef = useRef(); //refer to map
  const mapCenter = [39.920514604261506, 116.39601129456929];
  const zoom = 13;
  //when the currentStationIndex updates, move the map to the new center
  useEffect(() => {
    if (mapRef.current) {
      // mapRef.current.setView(stationLocationArr[currentStationIndex], zoom);
      mapRef.current.panTo([
        stations[currentStationIndex].latitude,
        stations[currentStationIndex].longitude,
      ]);
    }
  }, [currentStationIndex]);

  //track the basemap selection
  const [selectedBasemap, setSelectedBasemap] = useState("mapbox-streets-v11");
  const basemaps = {
    "Mapbox Customiazed Outdoors":
      "https://api.mapbox.com/styles/v1/ssactl99/clo1eyfuz00g901pf8a0ybguu/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A",
    "Mapbox Customiazed Standard Oil Company":
      "https://api.mapbox.com/styles/v1/ssactl99/clo1g6z1a00e701qxb75o3bvw/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A",
    "Mapbox Customiazed Frank":
      "https://api.mapbox.com/styles/v1/ssactl99/clo1iknhd00ah01qx55s979z3/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A",
    "Mapbox Customiazed Monochrome":
      "https://api.mapbox.com/styles/v1/ssactl99/clo1o91lt006v01qx426m4hio/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3NhY3RsOTkiLCJhIjoiY2xvMWV2ZW42MDcwMTJpbXNyZ3l6dm90ZCJ9.2Is1KTMgZB-UD56AlF3E0A",
    OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

  const handleBasemapChange = (basemap) => {
    setSelectedBasemap(basemap);
  };

  //for adding new marker
  const [markers, setMarkers] = useState([]);

  //visibility state for the current station name/banner
  const [showBanner, setShowBanner] = useState(true);
  useEffect(() => {
    if (
      stationClassList.every((s) => s === "station--hidden") &&
      playerDisplayEstateHidden === "player--estate--hidden"
    ) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [stationClassList, playerDisplayEstateHidden]);

  /////////////////////////////////////////////////////
  // return after all hooks
  /////////////////////////////////////////////////////
  if (!players || !stations || !levelfeatures) {
    console.log("data is not ready");
    return null;
  }

  console.log("data is ready!");

  const playerPositions = [
    [
      stations[player1StationIndex].latitude,
      stations[player1StationIndex].longitude,
    ],
    [
      stations[player2StationIndex].latitude,
      stations[player2StationIndex].longitude,
    ],
    [
      stations[player3StationIndex].latitude,
      stations[player3StationIndex].longitude,
    ],
    [
      stations[player4StationIndex].latitude,
      stations[player4StationIndex].longitude,
    ],
  ];
  console.log("APP-players", players);
  return (
    // <Container className="container" fluid="true">
    //   <Row>
    //     <Col xs sm md lg xl xxl className="column--1">
    //       Big Map
    //     </Col>
    //     <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} className="column--2">
    //       <Row xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className="row--1">
    //         Player Display
    //       </Row>
    //       <Row className="row--2">Small Map</Row>
    //     </Col>
    //   </Row>
    // </Container>

    <div className="container">
      <div className={playerDisplayEstateHidden}>
        <PlayerEstateBoard
          stations={stations}
          playerDisplayEstate={playerDisplayEstate}
          players={players}
          setplayerDisplayEstateHidden={setplayerDisplayEstateHidden}
          setPlayerDisplayEstate={setPlayerDisplayEstate}
        />
      </div>

      <div className="column--1">
        <div className={stationClassCustomers}>
          <StationCityForCustomers
            nextPlayer={nextPlayer}
            stations={stations}
            currentStationIndex={currentStationIndex}
            players={players}
            currentPlayer={currentPlayer}
            setPlayers={setPlayers}
            stationClassCustomers={stationClassCustomers}
            setCurrentStationIndex={setCurrentStationIndex}
            setCurrentPlayer={setCurrentPlayer}
            playersStationIndex={playersStationIndex}
            resetStationClass={resetStationClass}
            levelfeatures={levelfeatures}
          />
        </div>
        <div className={stationClassBuyers}>
          <StationCityForBuyers
            players={players}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            setCurrentStationIndex={setCurrentStationIndex}
            resetStationClass={resetStationClass}
            playersStationIndex={playersStationIndex}
            nextPlayer={nextPlayer}
            setPlayers={setPlayers}
            currentStationIndex={currentStationIndex}
            stations={stations}
            setStations={setStations}
            levelfeatures={levelfeatures}
            setMarkers={setMarkers}
            markers={markers}
          />
        </div>
        <div className={stationClassOther}>
          <StationOther
            nextPlayer={nextPlayer}
            stations={stations}
            setStations={setStations}
            currentStationIndex={currentStationIndex}
            players={players}
            setPlayers={setPlayers}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            levelfeatures={levelfeatures}
            stationClassCustomers={stationClassCustomers}
            setCurrentStationIndex={setCurrentStationIndex}
            playersStationIndex={playersStationIndex}
            resetStationClass={resetStationClass}
          />
        </div>
        <div className={stationClassMaxLevel}>
          <StationClassMaxLevel nextPlayer={nextPlayer} />
        </div>

        <Dice
          currentPlayer={currentPlayer}
          playersStationIndex={playersStationIndex}
          stationCount={stations.length}
          setplayerStation={[
            setplayer1StationIndex,
            setplayer2StationIndex,
            setplayer3StationIndex,
            setplayer4StationIndex,
          ]}
          updateCurrentStation={updateCurrentStation}
          stations={stations}
          currentStationIndex={currentStationIndex}
          updateStationClass={updateStationClass}
          stationClassList={stationClassList}
        />
        <div className={`banner ${showBanner ? "banner--show" : ""}`}>
          <p>{stations[currentStationIndex].name}</p>
        </div>
        {/* UI 元素，用于切换底图 */}
        <select
          className="select--basemap"
          onChange={(e) => handleBasemapChange(e.target.value)}
        >
          {Object.keys(basemaps).map((key) => (
            <option key={key} value={basemaps[key]}>
              {key}
            </option>
          ))}
        </select>
        <MapContainer
          ref={mapRef}
          center={[
            stations[currentStationIndex].latitude,
            stations[currentStationIndex].longitude,
          ]}
          zoom={zoom}
          scrollWheelZoom={false}
          closePopupOnClick={false}
        >
          <TileLayer
            attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={selectedBasemap}
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
              ...stations.map((station) => [
                station.latitude,
                station.longitude,
              ]),
              [stations[0].latitude, stations[0].longitude],
            ]}
            pathOptions={{ color: "green", weight: 5, dashArray: "20, 20" }}
          />
          {/* add new marker */}
          {markers &&
            markers.map((marker) => {
              console.log(marker.id);
              return (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>
                    <img
                      src={marker.avatar}
                      width={"40px"}
                      height={"40px"}
                    ></img>
                    {marker.name}
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
      <div className="column--2">
        <div className="row--1">
          <PlayerBoard
            players={players}
            currentPlayer={currentPlayer}
            setplayerDisplayEstateHidden={setplayerDisplayEstateHidden}
            setPlayerDisplayEstate={setPlayerDisplayEstate}
          />
        </div>
        <div className="row--2">
          <SmallMap playerPositions={playerPositions} stations={stations} />
        </div>
      </div>
    </div>
  );
}

export default App;
