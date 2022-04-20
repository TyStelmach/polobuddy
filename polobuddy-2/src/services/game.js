const { sortPlayersByPlayPercentage, weightPlayerIncrementally} = require('../libs/gameUtilities');

let teams = [
  {
    teamWeight: 0,
    players: []
  },
  {
    teamWeight: 0,
    players: []
  }
];

// Recursively and Incrementally select players based on previous chosen player
const selectPlayersForTeams = (players, i=1, previousPlayerWeight) => {
  if (players.length > 0) {
    const teamIndex = i % 2 === 0 ? 1 : 0;
    const highestGameWeight = previousPlayerWeight ? previousPlayerWeight : players[0].weight;
    
    //Highest weight by games played ratio
    const currentHighestWeightedPlayers = players.filter(player => player.weight === highestGameWeight);
    const randIndex = Math.floor(Math.random() * currentHighestWeightedPlayers.length); // #, or 0
    let modifiedPlayerPool = currentHighestWeightedPlayers.length > 0 ? currentHighestWeightedPlayers : players;
    const chosenPlayer = modifiedPlayerPool[randIndex];

    teams[teamIndex].players.push(chosenPlayer);
    teams[teamIndex].teamWeight += chosenPlayer.skillLevel;

    modifiedPlayerPool = players.filter(p => p.name !== chosenPlayer.name);

    //weights remaining player's skillweight based on chosen player's skill level
    weightPlayerIncrementally(chosenPlayer.skillLevel, modifiedPlayerPool);

    if (i <= 5) {
      let index = i+1;
      selectPlayersForTeams(modifiedPlayerPool, index, highestGameWeight);
    }
  }
}

const generateTeams = (players, totalGames) => {
  const playerPool = sortPlayersByPlayPercentage(players, totalGames);
  selectPlayersForTeams(playerPool);
  return teams;
}

const startGameInSession = async({ sessionId, teams, speed}) => {

  

}


export {
  startGameInSession,
  generateTeams
}
