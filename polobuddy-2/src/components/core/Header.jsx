import React, { useEffect, useContext } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { AuthContext } from '../../providers/AuthProvider';
import { getExistingSessionData } from '../../services/session';

const Header = ({ player }) => {
  const { user } = useContext(AuthContext);

  useEffect(async () => {
    if (user && player) {
      const { isHost, sessionPublicId } = player;
      const session = await getExistingSessionData(sessionPublicId);
      console.log(session)
      if (session) {}// redirect
      
    }
  }, [user, player]);

  return(
     <div>
    <Navbar color="dark" expand="md" dark>
      <NavbarBrand href="/">PoloBuddy</NavbarBrand>
      {user ? <SignOut id={user.uid} /> : <SignIn />}
    </Navbar>
  </div>
)
}

export default Header;