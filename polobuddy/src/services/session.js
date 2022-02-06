const { Session } = require('../models/newSession');

const createNewSession = async (publicId, userId) => {
  const newSession = new Session();
  newSession.publicId = publicId
  newSession.hostId = userId;
  console.log(newSession)
};

module.exports = {
  createNewSession
}