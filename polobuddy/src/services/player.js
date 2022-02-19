const { Player } = require('../models/newPlayer');
const { addDocToCollection } = require('./collections');

const createNewPlayer = async (userId, sessionId, { username, skillLevel }, type) => {
  const newPlayer = new Player();
  newPlayer.name = username;
  newPlayer.sessionPublicId = sessionId;
  newPlayer.skillName = skillLevel;
  newPlayer.isHost = type === 'host' ? true : false;
  console.log(newPlayer)
  await addDocToCollection('Players', {...newPlayer}, userId);
  return newPlayer;
};

module.exports = {
  createNewPlayer
}