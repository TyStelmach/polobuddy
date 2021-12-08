const { firebaseGet, firebasePost, firebaseDelete} = require('../libs/utils');
const { database } = require('../models/dbRoots');

const getSessionsActiveGame = async (sessionId) => firebaseGet(`${sessionId}/${database.game}`);

const getTeamsInActiveGame = async (sessionId) => firebaseGet(`${sessionId}/${database.teams}`);

module.exports = {
  getSessionsActiveGame,
  getTeamsInActiveGame
}