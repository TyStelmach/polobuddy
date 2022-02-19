const { Session } = require('../models/newSession');
const { generatePublicSessionId } = require('../libs/utilities')
const { addDocToCollection } = require('./collections');

const createNewSession = async (userId) => {
  const newSession = new Session();
  newSession.publicId = await generatePublicSessionId();
  newSession.hostId = userId;
  await addDocToCollection('Sessions', {...newSession}, newSession.publicId);
  return newSession.publicId;
};

module.exports = {
  createNewSession
}