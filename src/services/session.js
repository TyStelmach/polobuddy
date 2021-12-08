const { firebaseGet, firebasePost, firebasePush, firebaseDelete} = require('../libs/utils');
const { newSession } = require('../models/newSession');

const getAllSessions = async () => firebaseGet('');

const getSessionById = async (sessionId) => firebaseGet(sessionId);

const createNewSession = async () => firebasePost('', newSession);

const deleteSessionById = async (sessionId) => firebaseDelete(sessionId);

module.exports = {
  getAllSessions,
  getSessionById,
  createNewSession,
  deleteSessionById
};