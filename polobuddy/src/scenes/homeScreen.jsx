import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Button } from 'reactstrap';
import { AuthContext } from '../providers/AuthProvider';
import ContentCard from '../components/core/ContentCard';
import FormModal from "../components/home/FormModal";
import { findExistingDocument } from '../services/collections';

const Home = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');
  const togglePopup = (e) => {
    setModal(!modal);
    setType(e.target.name);
  };

  useEffect(() => {
    if (user) {
      //check if in current session
      // check if host
      findExistingDocument();

    }



  }, []);


  return (
    <Container>
      {user && `Welcome back ${user.displayName}`}
      <Row xs="2">
        <Col>
          <ContentCard
            title="Host new session"
            description="Begin hosting a polo session and allow others to join"
          >
            <Button onClick={togglePopup} name="host">
              Host Session
            </Button>
          </ContentCard>
        </Col>
        <Col>
          <ContentCard
            title="Join an existing session"
            description="Join an existing session to begin playing polo"
          >
            <Button onClick={togglePopup} name="join">
              Join Session
            </Button>
          </ContentCard>
          </Col>
      </Row>

      <FormModal id="myModal" toggle={togglePopup} type={type} modal={modal} />
    </Container>
  )
};

export default Home;