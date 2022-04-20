// Sets the percentage/weight to be chosen as a player in the upcoming game
const setPlayPercentage = (player, sessionGameCount) => {
  const levels = {
    'Beginner': 1,
    'Intermediate': 2,
    'Veteran': 3
  };

  player.skillLevel = levels[player.skillName];
  const gameRatio = Number.isNaN(player.gameCount/sessionGameCount) ? 0 : player.gameCount/sessionGameCount;
  player.weight = player.weight - gameRatio;
};

// Sorts array of players by their weighted ratios
const sortPlayersByPlayPercentage = (players, sessionGameCount) => {
  const sortedPlayers = players.sort((player1, player2) => {
    setPlayPercentage(player1, sessionGameCount);
    setPlayPercentage(player2, sessionGameCount);
    if (player1.weight === player2.weight) return 0;
    return player1.weight > player2.weight ? -1 : 1; 
  });
  return sortedPlayers;
}

const weightPlayerIncrementally = (playerSkill, players) => {
  players.forEach(player => {
    const skillDeficit = 1 - (player.skillLevel/playerSkill);
    console.log(player.weight, skillDeficit)
    player.weight = player.weight - skillDeficit;
  })
}

module.exports = {
  sortPlayersByPlayPercentage,
  weightPlayerIncrementally,
}