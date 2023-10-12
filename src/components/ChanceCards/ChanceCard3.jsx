import React from 'react';
import './ChanceCard.css';

function ChanceCard3({
  players,
  setPlayers,
  currentPlayer,
  stations,
  levelfeatures,
}) {
  console.log('here is ChanceCard3');
  // const updatedStations1 = stations.filter(
  //   (stations) => stations.belonger === 0,
  // )
  // const updatedStations = updatedStations1.map((station) => ({
  //   ...station,
  //   belonger: currentPlayer + 1,
  // }));

  // const currentPlayerCities = updatedStations.filter(
  //   (stations) => stations.belonger === currentPlayer + 1
  // )
  const currentPlayerCities = stations.filter(
    (stations) => stations.belonger === currentPlayer + 1
  )
  // console.log(levelfeatures);
  // console.log(currentPlayer);
  console.log(currentPlayerCities);

// Check if any of the currentPlayer's cities have the "Cuisine" feature
let hasCuisineCity = false;
let index = 0;

let cuisineStations = levelfeatures.filter(
  (feature) => feature.level === -9999,
)

for (const city of currentPlayerCities) {
  for (const feature of levelfeatures) {
    if (feature.cid === city.cid && feature.categories === 'Cuisine') {
      cuisineStations[index] = feature;
      hasCuisineCity = true;
      index++;
      break;
    }
  }
  if (hasCuisineCity) {
    break;
  }
}
  // Initialize the penalty
  let penalty = 0;

  if (!hasCuisineCity) {
    // If none of the cities have the "Cuisine" feature, grant the title and impose a penalty
    penalty = - 1000;
    // You can also grant the title here if needed
  }
  console.log(cuisineStations);
  console.log(penalty);
  
  function setCurrentPlayerScore() {
    const newPlayers = JSON.parse(JSON.stringify(players));
    // const owner = stations[currentStationIndex].belonger - 1; // the owner index
    //update the score of current player/customer and the owner
    // stationlevels.forEach((levelFeatrue) => {
      // if (levelFeatrue.level <= stations[currentStationIndex].level) {
        newPlayers[currentPlayer].score =
          players[currentPlayer].score + penalty;
          console.log(newPlayers);
        // newPlayers[owner].score = players[owner].score + levelFeatrue.scoreFine;
      // }
      setPlayers[newPlayers];
    }; 

  
  console.log(players);


  return (
    <div className='chance--card--result' onMouseOver = {setCurrentPlayerScore()}>
      <h3>Chance Card 3 - Cuisine Desert</h3>
      {hasCuisineCity ? (
        <div>
          <p>You own cities with Cuisine features. No penalty is imposed.</p>
          <p>Cuisine Stations:</p>
          <ul >
            {cuisineStations.map((feature, index) => (
              <li className='chance--card--list' key={index}>Station:{feature.cname} <br/>    Feature: {feature.fname}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>
            You don't own cities with the Cuisine feature.
          </p>
          <p>
            You are awarded the Cuisine Desert title which costs 1000 scores.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChanceCard3;
