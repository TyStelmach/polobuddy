
   
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './layouts/home';
import Host from './layouts/host';
import User from './layouts/user';


const PageRouting = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/session/host" element={<Host/>} />
      <Route exact path="/session/user" element={<User/>} />
    </Routes>
  </Router>
);

export default PageRouting;