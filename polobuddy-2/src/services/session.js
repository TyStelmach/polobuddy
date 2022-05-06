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
  const session = await findExistingDocument(sessionId, 'Sessions');
  return session;
};

const addPlayerToSession = async (player, sessionPublicId) => {
  const sessionExists = await getExistingSessionData(sessionPublicId);
  if (sessionExists) {
    await updateExistingDocument(sessionPublicId, {
      activeUsers: arrayUnion({...player}),
    }, 'Sessions');
  }
};

const updateActiveGameInSession = async (currentGame, sessionPublicId) => {
  const sessionExists = await getExistingSessionData(sessionPublicId);
  console.log('existis', sessionExists)
  if (sessionExists) {
    await updateExistingDocument(sessionPublicId, {
      activeGame: {...currentGame},
    }, 'Sessions');
  }
}

export {
  createNewSession,
  getExistingSessionData,
  addPlayerToSession,
  updateActiveGameInSession
}