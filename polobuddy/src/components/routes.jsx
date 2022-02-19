import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Home from '../scenes/homeScreen'
import Host from '../scenes/hostScreen';
//import User from './layouts/user';


const PageRouting = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!loading) {
      setCurrentUser(user);

    }
  }, [loading]);
  
  return (
    <Router>
      {!loading && 
        <Route exact path="/" render={() => <Home user={currentUser} />}/>
      }
    </Router>
  );
}

export default PageRouting;