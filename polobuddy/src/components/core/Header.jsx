import React, { useContext } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user } = useContext(AuthContext);

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