import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Home from '../scenes/homeScreen'
import Host from '../scenes/hostScreen';
import { findExistingDocument } from '../services/collections';


const PageRouting = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(async () => {
    if (!loading && user) {
      //check if in current session
      setCurrentUser(user.uid);
      const existingUser = await findExistingDocument(user.uid, 'Players');
      if (existingUser) {
        setCurrentUser(existingUser);
        //redirect user to either host or player page
      }
    }
  }, [loading]);
  
  return (
    <Router>
      {!loading &&
      <> 
        <Route exact path="/" render={(props) => <Home user={currentUser} {...props} /> } />
        <Route exact path="/sessions/host" render={(props) => <Host user={currentUser} {...props} /> } />
      </>
      }
    </Router>
  );
}

export default PageRouting;