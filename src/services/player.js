const { firebaseGet, firebasePost, firebaseDelete, firebasePatch} = require('../libs/utils');
const { getSessionById, createNewSession, getSessionByPublicId } = require('./session');
const { database } = require('../models/dbRoots');
const { Player } = require('../models/newPlayer');

const getAllPlayersInSession = async (sessionId) => {
  const sessionExists = await getSessionById(sessionId)
  if (sessionExists) {
    const players = await firebaseGet(`${database.players}`);
    const keys = Object.keys(players).filter(key => players[key].sessionId === sessionId);
    const filteredPlayers = keys.map(key => {
      players[key].userId = key;
      return players[key];
    });

    return filteredPlayers;
  };
};

const createNewPlayer = async ({publicId, username, skillLevel}) => {
  const privateId = await getSessionByPublicId(publicId);
  if (privateId) {
    const newPlayer = new Player(username, skillLevel, privateId, false)
    const id = await firebasePost(`${database.players}`, newPlayer);

    if (id) window.location.href = './session/user';
  }

  return;
};

const createNewHost = async ({username, skillLevel}, isHost) => {
  if (isHost) {
    const newSession = await createNewSession();
    const newPlayer = new Player(username, skillLevel, newSession, isHost);
    const id = await firebasePost(`${database.players}`, newPlayer);

    if (id) window.location.href = './session/host';
  }
};

const incrementPlayerGameCount = async (sessionId, playerId, playerGameCount) => {
  console.log(sessionId, playerId, playerGameCount)
  await firebasePatch(`${database.players}/${playerId}`, {
    gameCount: playerGameCount += 1,
  });
};


const deletePlayerFromSession = async (sessionId) => firebaseDelete(`${sessionId}/${database.players}/${playerId}`);

module.exports = {
  getAllPlayersInSession,
  createNewPlayer,
  createNewHost,
  deletePlayerFromSession,
  incrementPlayerGameCount
};