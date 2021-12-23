
import React from "react";
import styled from 'styled-components'
import PageRouting from './components/routes';
import Navigation from './components/core/navigation';
import Footer from './components/core/footer';


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
      <Wrapper>
        <PageRouting />
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
