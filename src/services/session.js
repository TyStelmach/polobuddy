const { firebaseGet, firebasePost, firebasePush, firebasePatch, firebaseDelete} = require('../libs/utils');
const { database } = require('../models/dbRoots');
const { Session } = require('../models/newSession');
const { generatePublicSessionId } = require('../libs/sessionUtilities');

const getAllSessions = async () => firebaseGet('');

const getSessionById = async (sessionId) => firebaseGet(`${database.sessions}/${sessionId}`);

const getSessionByPublicId = async (publicId) => {
  const sessions = await firebaseGet(`${database.sessions}`);
  const keys = Object.keys(sessions);
  if (keys.length) {
    const matched = keys.filter(key => sessions[key].publicId === publicId);
    return matched[0];
  }
}

const createNewSession = async () => {
  const publicId = await generatePublicSessionId();
  const newSession = new Session();
  newSession.publicId = publicId;
  const id = await firebasePost(database.sessions, newSession);
  return id;
};

const deleteSessionById = async (sessionId) => firebaseDelete(`${database.sessions}/${sessionId}`);

const incrementSessionGameCount = async (sessionId, sessionGameCount) => {
  await firebasePatch(`${database.sessions}/${sessionId}`, {
    totalGames: sessionGameCount += 1,
  });
};

module.exports = {
  getAllSessions,
  getSessionById,
  getSessionByPublicId,
  createNewSession,
  deleteSessionById,
  incrementSessionGameCount
};