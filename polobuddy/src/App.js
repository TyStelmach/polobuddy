import React, { useState, useEffect } from 'react';
import './App.css';
import PageRouting from './components/routes';
import Header from './components/core/Header';
import { AuthProvider } from './providers/AuthProvider';
import FirebaseProvider from './providers/FirebaseProvider';

const App = () => {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);

  //getSessionsFromFirestore();
  // snapshot.forEach(doc => {
  //   console.log(doc.id, '=>', doc.data());
  // });
 
 

  return (
    <div className="App">
      <FirebaseProvider>
        <AuthProvider >
          <Header />

          <header className="App-header">
            New App
          </header>

          <section>
            <PageRouting />
          </section>
        </AuthProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
