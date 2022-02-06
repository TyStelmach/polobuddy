import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import SignIn from './SignIn';
import SignOut from './SignOut';

const Header = ({
  user
}) => {
  return(
     <div>
    <Navbar color="dark" expand="md" dark>
      <NavbarBrand href="/">PoloBuddy</NavbarBrand>
      {user ? <SignOut /> : <SignIn />}
    </Navbar>
  </div>
)
}

export default Header;