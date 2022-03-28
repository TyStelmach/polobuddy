import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { FirebaseContext } from './FirebaseProvider';
import { deleteDocumentById } from '../services/collections';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const children = props.children;

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;

  useEffect(() => {
    if (auth) {
      let unsub = onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        setLoading(false);
      });

      return unsub;
    }
  }, [auth]);
  
  const loginFunction = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let userCred = await signInWithPopup(auth, provider);

      let user = userCred.user;
      setUser(user);
      return user;
    } catch (err) {
      let msg = `Login failure: ${err.message})`;
      console.log(msg);
    }
  }

  const logoutFunction = async (id) => {
    try {
      setUser(null);
      console.log('myid', id)
      await deleteDocumentById(id, 'Players');
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const theValues = {
    loading,
    user,
    login: loginFunction,
    logout: logoutFunction,
  };

  return (
    <AuthContext.Provider value={theValues}>
      {children}
    </AuthContext.Provider>
  );
};