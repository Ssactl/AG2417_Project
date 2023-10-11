// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
import React, { Component } from "react";
import { useState, useEffect } from "react";

//testing
const score = 200; //stations[currentStationIndex]-level-score

//parameters:players,setPlayers,currentPlayer,stations,currentStationIndex,setStations,setCurrentPlayer,setCurrentStationIndex,playersStationIndex,resetStationClass
function StationCityForBuyers({
  players,
  setPlayers,
  currentPlayer,
  stations,
  currentStationIndex,
  setStations,
  setCurrentPlayer,
  setCurrentStationIndex,
  playersStationIndex,
  resetStationClass,
  nextPlayer,
  levelfeatures,
  mapRef,
  markers,
  setMarkers,
  stationClassList,
}) {
  // 定义 state 来存储地点的详细信息
  const [placeDetails, setPlaceDetails] = useState(null);

  //get the attributes of current level of current station
  const stationlevels = levelfeatures.filter(
    (data) => data.cid == stations[currentStationIndex].cid
  );
  const currentLevelFeature =
    stationlevels[stations[currentStationIndex].level];
  // console.log(currentLevelFeature);

  //get the information about attraction from Google Map API
  useEffect(() => {
    if (google && google.maps) {
      console.log("display information");
      // 使用 Google Places API 获取地点的详细信息
      const request = {
        query: currentLevelFeature.fname, // 你可以使用地点的名称
        fields: ["place_id"],
      };

      const map = new google.maps.Map(document.createElement("div"));
      const service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const placeId = results[0].place_id;
          console.log("place id", placeId);

          //use place id to get more information
          const detailsRequest = {
            placeId,
            fields: ["name", "formatted_address", "geometry", "photos"],
          };

          service.getDetails(detailsRequest, (details, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log("Place Details:", details);
              setPlaceDetails(details);

              //get the position of the new marker
              const latitude = details.geometry.location.lat();
              const longitude = details.geometry.location.lng();
              const newMarker = {
                id: Math.random(), // 可以使用其他方式创建唯一标识符
                position: [latitude, longitude],
                name: details.name, // 你可以根据需要包含更多信息
              };

              setMarkers([...markers, newMarker]);
            }
          });
        }
      });
    }
  }, [currentLevelFeature]);

  // if the current player wants to buy the estate
  function buttonYesClickingHandler() {
    //update the score of the owner
    const newPlayers = JSON.parse(JSON.stringify(players));
    newPlayers[currentPlayer].score =
      players[currentPlayer].score - currentLevelFeature.scoreBuy;
    setPlayers(newPlayers);

    //update the level of the station
    const newStations = JSON.parse(JSON.stringify(stations));
    newStations[currentStationIndex].level =
      stations[currentStationIndex].level + 1;
    //if it is the first trade, update the belonger
    if (stations[currentStationIndex].belonger == 0) {
      newStations[currentStationIndex].belonger = currentPlayer + 1;
    }
    setStations(newStations);
    nextPlayer();
  }
  //if the current player does not want to buy the estate
  function buttonNoClickingHandler() {
    nextPlayer();
  }

  return (
    <div className="station station--city--buyers">
      <div className="station--buyers--column--1">
        {placeDetails ? (
          <div>
            <h3>{placeDetails.name}</h3>
            <p>Address: {placeDetails.formatted_address}</p>
            <div className="button--buyers--photo-scroll-container">
              {placeDetails.photos && placeDetails.photos.length > 0 ? (
                placeDetails.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.getUrl()}
                    alt={placeDetails.name}
                    className="place-photo"
                  />
                ))
              ) : (
                <p>No photos available</p>
              )}
            </div>

            {/* {placeDetails.photos && placeDetails.photos.length > 0 ? (
              <img
                src={placeDetails.photos[0].getUrl()}
                alt={placeDetails.name}
                className="place-photo"
              />
            ) : (
              <p>No photos available</p>
            )} */}
          </div>
        ) : (
          <p>Loading place details...</p>
        )}
      </div>
      <div className="station--buyers--column--2">
        {/* <div className="station--buyers--column--2--row--1">for image</div> */}
        <div className="station--buyers--column--2--row--2">
          <p>{currentLevelFeature.textBuy}</p>
          <p>Level: {currentLevelFeature.level}</p>
          <p>Credits: {currentLevelFeature.scoreBuy}</p>
        </div>
        <div className="station--buyers--column--2--row--3">
          <button
            className="station--buyers--button station--buyers--button--yes"
            onClick={buttonYesClickingHandler}
          >
            yes
          </button>
          <button
            className="station--buyers--button station--buyers--button--no"
            onClick={buttonNoClickingHandler}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default StationCityForBuyers;
