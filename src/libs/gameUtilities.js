// 0 = beginner, 1 = intermediate, 2=veteran

let players = [
	{
    name: 'player1',
    skillLevel: 3,
    gameCount: 0
  },
	{
    name: 'player2',
    skillLevel: 1,
    gameCount: 0
  },
  {
    name: 'player3',
    skillLevel: 2,
    gameCount: 0
  },
	{
    name: 'player4',
    skillLevel: 1,
    gameCount: 2
  },
	{
    name: 'player5',
    skillLevel: 3,
    gameCount: 0
  },
  {
    name: 'player6',
    skillLevel: 1,
    gameCount: 3
  },
    {
    name: 'player7',
    skillLevel: 2,
    gameCount: 0
  },
	{
    name: 'player8',
    skillLevel: 3,
    gameCount: 2
  },
	{
    name: 'player9',
    skillLevel: 1,
    gameCount: 0
  },
  {
    name: 'player10',
    skillLevel: 3,
    gameCount: 3
  },
];

/*
	P = play percentage (D-(P/G)) as weight
  G = Gamecount in session
	D = Player default weight, 1
  S = Player Skill Level 0-2

*/

const sortByPlayPct = (players, GC) => {
  const setP = (player, GC) => {
  	const weight = 1 - (player.gameCount/GC);
  	player.weight = weight;
  };
  
  const sortedPlayers = players.sort((p1, p2) => {
  	setP(p1, GC);
    setP(p2, GC);
    if (p1.weight === p2.weight) return 0;
    return p1.weight > p2.weight ? -1 : 1;
  })
  return sortedPlayers;
}


/*
	1. Take sorted array, grab all players with Highest weight, select one at random
  2. Add selected player to Team 1, remove them from player pool
  3. Using team weight, update player weights
  4. repeat function
*/

let teams = [
	{
    teamWeight: 0,
  	players: []
  },
  {
    teamWeight: 0,
    players: []
  }
]

const incrementalPlayerWeighting = (chosenSkill, array) => {
  array.forEach(player => {
    const skillDeficit = 1 - (player.skillLevel/chosenSkill);
    // Player is lvl 3, do nothing for weighting
    if (skillDeficit === 0) return;
    player.weight = player.weight - skillDeficit;
    console.log(player.name, player.weight)
  });
  return array;
}

const getPlayer = (array, i = 1, prevWeight) => {
	const teamIndex = i % 2 === 0 ? 1 : 0;
  const highestWeight = parseInt(array[0].weight) ? array[0].weight : prevWeight;  
  let highestWeightedPlayers = array.filter(player => player.weight === highestWeight);
  const randIndex = Math.floor(Math.random() * highestWeightedPlayers.length);
  
  const player = array[randIndex];
  teams[teamIndex].players.push(player);
  teams[teamIndex].teamWeight += player.skillLevel;
	
	newArray = array.filter(p => p.name !== player.name);
  incrementalPlayerWeighting(player.skillLevel, newArray);
    
  if (i <= 5) {
  	let index = i+1;
    getPlayer(newArray, index, highestWeight);
  }
}


const sorted = sortByPlayPct(players, 3);
const playerPool = [...sorted];

getPlayer(playerPool);


console.log(teams);



/* 
const buildTeams = (players) => {
  let allPlayers = [...players];
  
  const adjustWeights = (playerSkill, ) => {
    
  }

  const grabFirstPlayer = (playerArr) => {
    const randIndex = Math.floor(Math.random() * playerArr.length);
    const player = playerArr[randIndex];
    console.log(playerArr)
    teamOne.players.push(player);
    teamOne.teamWeight += player.skillLevel;
    prevPlayer = player;
    
    allPlayers = allPlayers.filter(player => !playerArr.some(p => p.name === player.name));
  };

  let teamOne = {
    teamWeight: 0,
    players: [],
  };
  let teamTwo = {
    teamWeight: 0,
    players: [],
  };
  
  let prevPlauer = '';
  let highestWeight = players[0].weight; 
  let highestWeightedPlayers = players.filter(player => player.weight === highestWeight);
  

  grabFirstPlayer(highestWeightedPlayers);

  console.log(teamOne, prevPlayer)

}
 */



/* const distributePlayers = (players) => {
  let teamOne = {
    teamWeight: 0,
    players: [],
  };
  let teamTwo = {
    teamWeight: 0,
    players: [],
  };
  let allPlayers = [...players];
  let standardWeight = playerPool[0].weight;
  
  const highestWeightPlayers = players.filter(player => player.weight === standardWeight);
  playerPool = playerPool.filter(player => !highestWeightPlayers.some(p => p.name === player.name)); */
  
	
  
  
  
  
  
	// Loop players, set highest index, return players that match index
  /*
  	StandarcWeightPlayers === players with highest weight in list
    SkillWeight === Combined SkillLevels within list of highest Weight
  */
/*   if (teamOne.length < 3 || teamTwo.length < 3 || playerPool.length < 0) { 
    let standardWeight = playerPool[0].weight;
    const highestWeightPlayers = playerPool.filter(player => player.weight === standardWeight);
    let skillWeight = highestWeight.map(player => player.skillLevel).reduce((a, b) => a + parseInt(b));
    const firstPlayer
    
  
  
  
  
  } */
  
  
/* console.log(highestWeight, skillWeight) */;


















