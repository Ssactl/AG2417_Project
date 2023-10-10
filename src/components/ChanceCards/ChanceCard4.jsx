import React from 'react';

// display all the cities belongs to currentPlayer with 300km buffer in a map
// display the score.
const ChanceCard4 = {
  execute: (props) => {
    const {
      players,
      currentPlayer,
      cities,
      setCurrentPlayer,
      setPlayers,
    } = props;

    // 获取当前玩家的城市
    const currentPlayerCities = stations.filter(city => city.belonger === currentPlayer && city.level > 0);

    // 检查每两座城市的距离是否不超过300km
    let totalReward = 0;
    for (let i = 0; i < currentPlayerCities.length; i++) {
      for (let j = i + 1; j < currentPlayerCities.length; j++) {
        const city1 = cities.find((city) => city.id === currentPlayerCities[i]);
        const city2 = cities.find((city) => city.id === currentPlayerCities[j]);
        if (city1 && city2) {
          const distance = calculateDistance(city1, city2);
          if (distance <= 300) {
            totalReward += 1000;
          }
        }
      }
    }

    // 更新当前玩家的资金
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].money += totalReward;

    // 更新玩家信息
    setPlayers(updatedPlayers);

    // 切换到下一个玩家
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayer(nextPlayerIndex);
  },
};

// 计算两个城市之间的距离
function calculateDistance(city1, city2) {
  // 这里可以根据实际需求计算城市之间的距离
  // 返回一个代表距离的数值
  // 以下示例计算了城市之间的欧氏距离
  const x1 = city1.x;
  const y1 = city1.y;
  const x2 = city2.x;
  const y2 = city2.y;
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
}

export default ChanceCard4;
