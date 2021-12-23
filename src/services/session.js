const { firebaseGet, firebasePost, firebasePush, firebaseDelete} = require('../libs/utils');
const { database } = require('../models/dbRoots');
const { Session } = require('../models/newSession');

const getAllSessions = async () => firebaseGet('');

const getSessionById = async (sessionId) => firebaseGet(`${database.sessions}/${sessionId}`);

const createNewSession = async () => {
  const newSession = new Session();
  const id = await firebasePost(database.sessions, newSession);
  return id;
};

const deleteSessionById = async (sessionId) => firebaseDelete(`${database.sessions}/${sessionId}`);

module.exports = {
  getAllSessions,
  getSessionById,
  createNewSession,
  deleteSessionById
};