import React, { useContext, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AuthContext } from '../../providers/AuthProvider';
import SignupForm from './HomeForm';
import { createNewSession } from '../../services/session';
import { createNewPlayer } from '../../services/player';

const FormModal = ({
  type='host',
  modal=false,
  toggle={},
}) => { 
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({});

  const registerToApp = async () => {
    try {
      const userId = await login();
      console.log(userId)
      if (userId) {
        // User has auth'd in via google
        const sessionId = type === 'host' ? await createNewSession(userId) : formData.sessionId;
        await createNewPlayer(userId, sessionId, formData, type);
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