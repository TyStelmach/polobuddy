const axios = require('axios');
const { firebaseConfig: { authKey, databaseURL } } = require('./firebase');
const { newSession } = require('../models/newSession');
const { newPlayer } = require('../models/newPlayer');
const { database: { sessions } } = require('../models/dbRoots');

const firebaseGet = async (paramString = '') => {
  try {
    const { data } = await axios.get(`${databaseURL}/${sessions}/${paramString}.json`);
    return data;
  } catch (err) {
    console.log('err:', err);
  }
}

const firebasePost = async (paramString = '', creationModel) => {
  try {
    const { data: { name } } = await axios.post(`${databaseURL}/${sessions}/${paramString}.json?auth=${authKey}`, creationModel);
    return name;
  } catch (err) {
    console.log('err', err);
  }
}

const firebasePush = async (paramString = '', creationModel) => {
  try {
    const { data: { name } } = await axios.push(`${databaseURL}/${sessions}/${paramString}json?auth=${authKey}`, creationModel);
    return name;
  } catch (err) {
    console.log('err', err);
  }
}

const firebaseDelete = async (paramString = '') => {
  try {
    const { status } = await axios.delete(`${databaseURL}/${sessions}/${paramString}.json?auth=${authKey}`);
    return status;
  } catch (err) {
    console.log('err', err);
  }
}

const firebasePatch = async(paramsString = '', newData) => {
  try {
    const { data: { name } } = await axios.patch(`${databaseURL}/${sessions}/${paramString}json?auth=${authKey}`, newData);
    return name;
  } catch (err) {
    console.log('err', err);
  }
}

const getActiveGameOfSession = async (sessionId) => {
  try {
    const { data } = await axios.get(`https://polobuddy-d935a-default-rtdb.firebaseio.com/sessions/${sessionId}/activeGame.json`);
    return data;
  } catch (err) {
    console.log('err:', err);
  }
};


const createNewSession = async () => {
  try {
    const { data: { name } } = await axios.post(`https://polobuddy-d935a-default-rtdb.firebaseio.com/sessions.json?auth=${authKey}`, newSession);
    return name;
  } catch (err) {
    console.log('err', err);
  }
};

const createNewPlayer = async (sessionName) => {
  try {
    const { data: { name } } = await axios.post(`https://polobuddy-d935a-default-rtdb.firebaseio.com/sessions/${sessionName}/players.json?auth=${authKey}`, newPlayer);
    return name;
  } catch (err) {
    console.log('err', err);
  }
}

const createTeamInActiveGame = async (
  sessionName, 
  playerIds = [], 
  index = 0
) => {
  try {
    if (playerIds.length >= 2) {
      const team = `team-${index+1}`
      const { data } = await axios.put(`https://polobuddy-d935a-default-rtdb.firebaseio.com/sessions/${sessionName}/activeGame/teams/${team}.json?auth=${authKey}`, playerIds);
      console.log(data);
    }
  } catch (err) {
    console.log('err', err);
  }
}

module.exports = {
  firebaseGet,
  firebasePost,
  firebasePush, 
  firebaseDelete
};