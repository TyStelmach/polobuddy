import React from 'react';
import firebase from 'firebase/compat/app';
import { Button } from 'reactstrap';


const auth = firebase.auth();

const SignOut = () => (
  <Button 
    color="primary"
    onClick={() => auth.signOut()}>
    Sign Out
  </Button>
);

export default SignOut;