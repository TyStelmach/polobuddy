import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { createNewPlayer, createNewHost } from '../../services/player';

import SignupForm from './form';

const FormModal = ({
  type='host',
  modal=false,
  toggle={},
}) => { 
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    e.persist();
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const isHost = type === 'host';
  const title = isHost ? 'Create a new session' : 'Join an existing session';

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {title}
      </ModalHeader>
      <ModalBody>
        <SignupForm type={type} changeHandler={handleInputChange} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => isHost ? createNewHost(formData, isHost) : createNewPlayer(formData)}>
          Sign Up
        </Button>
        <Button onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default FormModal;
