import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Home from '../scenes/homeScreen'
import Host from '../scenes/hostScreen';
import Header from './core/Header';
import { findExistingDocument } from '../services/collections';


const PageRouting = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(async () => {
    if (!loading && user) {
      //check if in current session
      const existingUser = await findExistingDocument(user.uid, 'Players');
      if (existingUser) {
        setCurrentUser(existingUser);
      }
    }
  }, [loading]);
  
  return (
      <>
      {currentUser &&
        <div>
          <Header player={currentUser}/>
          <Router>
            {!loading &&
            <> 
              <Route exact path="/" render={(props) => <Home user={currentUser} {...props} /> } />
              <Route exact path="/session/host" render={(props) => <Host user={currentUser} {...props} /> } />
            </>
            }
          </Router>
        </div>
      }
      </>
  );
}

export default PageRouting;