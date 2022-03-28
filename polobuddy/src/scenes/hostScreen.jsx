import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import UsersTable from "../components/core/UserTable";
import ContentCard from '../components/core/ContentCard';
import FormModal from "../components/home/FormModal";
import { getExistingSessionData } from '../services/session';

const Host = ({ user }) => {
  const [sessionId, setSessionId] = useState('');
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [sessionActiveGame, setSessionActiveGame] = useState({});

  useEffect(async () => {
    if (user) {
      const session = await getExistingSessionData(user.sessionPublicId);
      console.log(user)
      if (session) {
        //comes from session
        setSessionPlayers([{ 
          name: user.name,
          skillLevel: user.skillName,
          gameCount: user.gameCount,
        }]);

        setSessionId(user.sessionPublicId);
        setSessionActiveGame(session.activeGame);
      }
    }
  }, [user]);

  return (
    <Container>
      {user && `Welcome back ${user.name}, you're in SESSION: ${sessionId}`}
      <Row xs="2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Players in Session({!sessionPlayers ? 0 : sessionPlayers.length})</CardTitle>
              <UsersTable players={sessionPlayers} />
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Players in Game</CardTitle>
              <p>Gamespeed: </p>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
};

export default Host;