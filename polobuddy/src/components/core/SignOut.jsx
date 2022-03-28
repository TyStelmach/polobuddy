import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { AuthContext } from '../../providers/AuthProvider';

const SignOut = ({ id }) => {
  const { logout } = useContext(AuthContext);

  return (
    <Button 
      color="primary"
      onClick={() => logout(id)}>
      Sign Out
    </Button>
  )
};

export default SignOut;