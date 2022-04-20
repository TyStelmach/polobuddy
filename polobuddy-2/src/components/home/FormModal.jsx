import React, { useContext, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AuthContext } from '../../providers/AuthProvider';
import SignupForm from './HomeForm';
import { createNewSession, addPlayerToSession } from '../../services/session';
import { createNewPlayer } from '../../services/player';
const { generatePublicSessionId } = require('../../libs/utilities')

const FormModal = ({
  userId,
  type='host',
  modal=false,
  toggle={},
}) => { 
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const registerToApp = async () => {
    try {
      const userAuth = await login();
      if (userAuth) {
        const sessionId = type === 'host' ? await generatePublicSessionId() : formData.sessionId;
        const newPlayer = await createNewPlayer(userAuth.uid, sessionId, formData, type);
        if (type === 'host') await createNewSession(userAuth.uid, sessionId);
        
        await addPlayerToSession(newPlayer, sessionId);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

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
          onClick={() => registerToApp()}>
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