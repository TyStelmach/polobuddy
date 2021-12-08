import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Navigation = () => (
  <div>
    <Navbar color="dark" expand="md" dark>
      <NavbarBrand href="/">PoloBuddy</NavbarBrand>
    </Navbar>
  </div>
);

export default Navigation;