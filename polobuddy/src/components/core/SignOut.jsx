import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { AuthContext } from '../../providers/AuthProvider';

const SignOut = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button 
      color="primary"
      onClick={() => logout()}>
      Sign Out
    </Button>
  )
};

export default SignOut;