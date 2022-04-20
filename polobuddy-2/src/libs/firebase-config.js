import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {  
  apiKey: "AIzaSyAR7Df05JPbU0B6OWRyS5JbTUNb3NRD2mE",
  authDomain: "polobuddyv2.firebaseapp.com",
  projectId: "polobuddyv2",
  storageBucket: "polobuddyv2.appspot.com",
  messagingSenderId: "751420980913",
  appId: "1:751420980913:web:a1fc1253d009fdd4056c90"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const cloudFuncs = getFunctions(app);

export {
  app,
  auth,
  db,
  cloudFuncs
};