// 0 = beginner, 1 = intermediate, 2=veteran

const sortByPlayPct = (players, GC) => {
  const setP = (player, GC) => {
    const levels = {
      'Beginner': 1,
      'Intermediate': 2,
      'Veteran': 3
    };
  
    player.skillLevel = levels[player.skillName];

    const gameRatio = Number.isNaN(player.gameCount/GC) ? 0 : player.gameCount/GC;
  	player.weight = player.weight - gameRatio;
  };
  
  const sortedPlayers = players.sort((p1, p2) => {
  	setP(p1, GC);
    setP(p2, GC);
    if (p1.weight === p2.weight) return 0;
    return p1.weight > p2.weight ? -1 : 1;
  })

  return sortedPlayers;
}

const incrementalPlayerWeighting = (chosenPlayerSkillLevel, array) => {
  array.forEach(player => {
    const skillDeficit = 1 - (player.skillLevel/chosenPlayerSkillLevel);
    player.weight = player.weight - skillDeficit;
  });
};

const createTeams = (playersFromDatabase, sessionTotalGames) => {
  const players = playersFromDatabase; 
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

  const getPlayer = (array, i=1, prevGameWeight) => {
    console.log(array[0].weight);
    const teamIndex = i % 2 === 0 ? 1 : 0;
    const highestGameWeight = prevGameWeight ? prevGameWeight : array[0].weight;

    //Highest weight by games played ratio
    const currentHighestWeightedPlayers = array.filter(player => player.weight === highestGameWeight);
    const randIndex = Math.floor(Math.random() * currentHighestWeightedPlayers.length); // #, or 0
    let modifiedPlayerPool = currentHighestWeightedPlayers.length > 0 ? currentHighestWeightedPlayers : array;
    const chosenPlayer = modifiedPlayerPool[randIndex];

    teams[teamIndex].players.push(chosenPlayer);
    teams[teamIndex].teamWeight += chosenPlayer.skillLevel;
    // removes chosen player
    modifiedPlayerPool = array.filter(p => p.name !== chosenPlayer.name);

    //weights remaining player's skillweight based on chosen player's skill level
    incrementalPlayerWeighting(chosenPlayer.skillLevel, modifiedPlayerPool);

    if (i <= 5) {
      let index = i+1;
      getPlayer(modifiedPlayerPool, index, highestGameWeight);
    }
  }

  const playerPool = sortByPlayPct(players, sessionTotalGames);
  getPlayer(playerPool);
  return teams;
};

module.exports = {
  createTeams
};