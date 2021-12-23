import React from 'react';
import { Navbar } from 'reactstrap';
import styled from 'styled-components';

const FooterText = styled.div`
  color: #fff;
  text-align: center;
  margin: 0 auto;
  display: block
`

const Footer = () => (
  <div>
    <Navbar color="dark" expand="md" dark>
      <FooterText>Created by BBP</FooterText>
    </Navbar>
  </div>
);

export default Footer;
