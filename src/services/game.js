const { firebaseGet, firebasePost, firebaseDelete} = require('../libs/utils');
const { getSessionById } = require('./session');
const { database } = require('../models/dbRoots');

const getActiveGameBySession = async (sessionId) => {
  const sessionExists = await getSessionById(sessionId)
  if (sessionExists) {
    const activeGame = await firebaseGet(`${database.sessions}/${sessionId}/${database.game}`);
    return activeGame;
  }
}
module.exports = {
  getActiveGameBySession
}