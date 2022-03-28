import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from 'reactstrap';

import HomeCardBody from "../core/homeCardContent";
import FormModal from "../core/formModal";
import { getSessionByPublicId } from "../../services/session";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');

  const togglePopup = (e) => {
    setModal(!modal);
    setType(e.target.name);
  };

  useEffect(async () => {
    const c = await getSessionByPublicId('67F-NCI8');
    console.log(c[0]);
  }, []);

  return (
    <Container>
      <Row xs="2">
        <Col>
          <Card>
            <HomeCardBody
              title="Host new session"
              description="Begin hosting a polo session and allow others to join"
              type="host"
              toggle={togglePopup} 
            />
          </Card>
        </Col>

        <Col>
          <Card>
            <HomeCardBody
              title="Join existing session"
              description="Join an existing session to begin playing polo"
              type="join"
              toggle={togglePopup} 
            />
          </Card>
        </Col>
      </Row>
      <Row xs="2">
        Test Row
      </Row>

      <FormModal id="myModal" toggle={togglePopup} type={type} modal={modal} />
    </Container>
  )
};

export default Home;