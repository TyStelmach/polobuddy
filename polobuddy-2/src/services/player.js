const { Player } = require('../models/newPlayer');
const { addNewDocumentRandomId, addNewDocumentPresetId } = require('./collections');

const createNewPlayer = async (userId, sessionId, formData, type) => {
  console.log('aaaaa', userId)

  const { username, skillLevel } = formData;
  const newPlayer = new Player();
  newPlayer.name = username;
  newPlayer.sessionPublicId = sessionId;
  newPlayer.skillName = skillLevel;
  newPlayer.isHost = type === 'host' ? true : false;
  newPlayer.id = userId;
  await addNewDocumentPresetId(userId, {...newPlayer}, 'Players');
  return newPlayer;
};

module.exports = {
  createNewPlayer
}