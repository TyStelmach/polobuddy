import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import UsersTable from "../components/core/UserTable";
import ContentCard from '../components/core/ContentCard';
import FormModal from "../components/home/FormModal";
import { getExistingSessionData } from '../services/session';
import { generateTeams } from '../services/game';


const Host = ({ user }) => {
  const [sessionId, setSessionId] = useState('');
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [sessionActiveGame, setSessionActiveGame] = useState({});
  const [sessionTotalGames, setSessionTotalGames] = useState('');
  const [sessionCurrentTeams, setSessionCurrentTeams] = useState([]);

  const hostControls = {
    startGame: () => {},
    shuffleTeams: () => {
      const teams = generateTeams(sessionPlayers, sessionTotalGames);
      console.log(teams)
      setSessionCurrentTeams(teams);
    } 
  };

  const handleHostButton = (e) => {
    e.preventDefault();
    const command = e.target.name;
    if (hostControls[command]) hostControls[command]();
  };


  useEffect(async () => {
    if (user) {
      const session = await getExistingSessionData(user.sessionPublicId);
      if (session) {
        //comes from session
        console.log('mySession', session)
        setSessionPlayers([...session.activeUsers]);
        setSessionId(user.sessionPublicId);
        setSessionActiveGame(session.activeGame);
        setSessionTotalGames(session.totalGames);
      }
    }
  }, [user]);

  return (
    <Container>
      {user && `Welcome back ${user.name}, you're in SESSION: ${sessionId}`}
      <Button name="shuffleTeams" onClick={handleHostButton}>
          Shuffle Teams
        </Button>
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