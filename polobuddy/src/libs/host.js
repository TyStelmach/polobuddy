const { getDocumentInCollection } = require('../services/collections');

const checkIfUserIsHost = async (userId, sessionId) => {
  const session = await getDocumentInCollection('Sessions', sessionId);
  return session && session.hostId === userId ? true : false;
};

module.exports = {
  checkIfUserIsHost,
}