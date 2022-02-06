/* eslint import/first: 0 */ 
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';
import {firestore, auth} from './services/firebase.js'
import Header from './components/core/Header';

import Home from './scenes/homeScreen';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Header
        user={user}
      />


      <section>
        <Home />
      </section>
    </div>
  );
}

export default App;
