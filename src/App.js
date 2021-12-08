
import React from "react";
import styled from 'styled-components'
import { hot } from 'react-hot-loader/root';
import {
  getAllPlayersInSession,
  createNewPlayer
} from './services/player';

import { default as Home } from './components/layouts/home';
import { default as Navigation } from './components/core/navigation';

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 2rem auto;
  padding: 1rem;
  background: lightgray;
`

const App = () => {
  return (
    <div>
      <Navigation />
      {/*  set up routing based on page */}
      <Wrapper>
        Test
        <Home />
      </Wrapper>
    </div>
  );
}

export default hot(App);
