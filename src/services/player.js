const { firebaseGet, firebasePost, firebaseDelete} = require('../libs/utils');
const { newPlayer } = require('../models/newPlayer');
const { database } = require('../models/dbRoots');

const getAllPlayersInSession = async (sessionId) => firebaseGet(`${sessionId}/${database.players}`);

const createNewPlayer = async (sessionId) => firebasePost(`${sessionId}/${database.players}`, newPlayer);

const deletePlayerFromSession = async (sessionId) => firebaseDelete(`${sessionId}/${database.players}/${playerId}`);

module.exports = {
  getAllPlayersInSession,
  createNewPlayer,
  deletePlayerFromSession
};