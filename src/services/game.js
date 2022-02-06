const { firebaseGet, firebasePatch, firebasePost, firebaseDelete} = require('../libs/utils');
const { getSessionById, incrementSessionGameCount } = require('./session');
const { incrementPlayerGameCount } = require('./player');
const { database } = require('../models/dbRoots');

const getActiveGameBySession = async (sessionId) => {
  const sessionExists = await getSessionById(sessionId)
  if (sessionExists) {
    const activeGame = await firebaseGet(`${database.sessions}/${sessionId}/${database.game}`);
    return activeGame;
  }
}

const startActiveGame = async (sessionId, session, teams) => {
  await firebasePatch(`${database.sessions}/${sessionId}/${database.game}`, {
    isStarted: true,
    speed: 'default',
    teams, 
  } );

  await incrementSessionGameCount(sessionId, session.totalGames);

  Object.keys(teams).forEach(async key => {
    teams[key].players.forEach(async player => {
      console.log(player.gameCount)
      await incrementPlayerGameCount(sessionId, player.userId, player.gameCount);
    })
  });
}
module.exports = {
  getActiveGameBySession,
  startActiveGame
}