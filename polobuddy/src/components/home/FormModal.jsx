import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@firebase/auth';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import SignupForm from './HomeForm';
import SignIn from '../core/SignIn';
import { createNewSession } from '../../services/session';

const FormModal = ({
  type='host',
  modal=false,
  toggle={},
}) => { 
  const [formData, setFormData] = useState({});
  const auth = firebase.auth();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider);
    await createNewSession('123', '456');
  }

  const handleInputChange = (e) => {
    //e.persist();
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {type === 'host' ? 'Host Session' : 'Join Session'}
      </ModalHeader>
      <ModalBody>
        <SignupForm type={type} changeHandler={handleInputChange} />
      </ModalBody>
      <ModalFooter>
        <Button 
          onClick={() => signInWithGoogle()}>
          Sign In
        </Button>
        <Button onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>

  )

};

export default FormModal;