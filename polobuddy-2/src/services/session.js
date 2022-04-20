import { arrayUnion } from 'firebase/firestore';
const { Session } = require('../models/newSession');
const { addNewDocumentPresetId, addDocToCollection, updateExistingDocument, findExistingDocument } = require('./collections');

const createNewSession = async (userId, sessionPublicId) => {
  const newSession = new Session();
  newSession.publicId = sessionPublicId;
  newSession.hostId = userId;
  await addNewDocumentPresetId(newSession.publicId, {...newSession}, 'Sessions');
  return newSession.publicId;
};

const getExistingSessionData = async (sessionId) => {
  const session = findExistingDocument(sessionId, 'Sessions');
  return session;
};

const addPlayerToSession = async (player, sessionPublicId) => {
  const sessionExists = getExistingSessionData(sessionPublicId);
  if (sessionExists) {
    await updateExistingDocument(sessionPublicId, {
      activeUsers: arrayUnion({...player}),
    }, 'Sessions');
  }
};

export {
  createNewSession,
  getExistingSessionData,
  addPlayerToSession
}