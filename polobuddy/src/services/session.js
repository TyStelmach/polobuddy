import { FieldValue, getFirestore } from 'firebase-admin/firestore';
const { Session } = require('../models/newSession');
const { addNewDocumentPresetId, addDocToCollection, updateExistingDocument, findExistingDocument } = require('./collections');

const createNewSession = async (userId, sessionPublicId) => {
  const newSession = new Session();
  newSession.publicId = sessionPublicId;
  console.log('myuser', userId)
  newSession.hostId = userId;
  await addNewDocumentPresetId(newSession.publicId, {...newSession}, 'Sessions');
  return newSession.publicId;
};


// figure out why this isnt fucking working
const addPlayerToSession = async (player, sessionPublicId) => {
  await updateExistingDocument(sessionPublicId, {
    'Players': FieldValue.arrayUnion(player),
  }, 'Sessions');
};

const joinExistingSession = async (sessionId, user) => {
  
}

const getExistingSessionData = async (sessionId) => {
  const session = findExistingDocument(sessionId, 'Sessions');
  return session;


};

module.exports = {
  createNewSession,
  getExistingSessionData,
  addPlayerToSession
}