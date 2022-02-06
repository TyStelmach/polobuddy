import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@firebase/auth';

const SignIn = () => {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <Button 
      color="primary"
      onClick={() => signInWithGoogle()}>
      Sign In
    </Button>
  )
};

export default SignIn;