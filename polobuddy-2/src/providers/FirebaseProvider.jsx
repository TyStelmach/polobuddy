import { createContext } from 'react';
import { app, auth, db, cloudFuncs } from '../libs/firebase-config'; 
export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  const children = props.children;
  
  const theValues = { app, auth, db, cloudFuncs};
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
