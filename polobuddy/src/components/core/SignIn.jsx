import React, { useContext} from 'react';
import { Button } from 'reactstrap';
import { AuthContext } from '../../providers/AuthProvider';

const SignIn = () => {
  const auth = useContext(AuthContext);
  const loginFn = auth.login;

  return (
    <Button 
      color="primary"
      onClick={() => loginFn()}>
      Sign In
    </Button>
  )
};

export default SignIn;