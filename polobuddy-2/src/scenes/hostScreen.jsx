import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import UsersTable from "../components/core/UserTable";
import ContentCard from '../components/core/ContentCard';
import FormModal from "../components/home/FormModal";
import ActiveGameCard from "../components/host/ActiveGameCard";
import PendingGameCard from "../components/host/ActiveGameCard";
import { getExistingSessionData } from '../services/session';
import { generateTeams, startGameInSession } from '../services/game';
import { getCurrentUnix } from "../libs/utilities";


const Host = ({ user }) => {
  const [sessionId, setSessionId] = useState('');
  const [mySession, setMySession] = useState({});
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [sessionActiveGame, setSessionActiveGame] = useState(null);
  const [sessionTotalGames, setSessionTotalGames] = useState('');
  const [sessionCurrentTeams, setSessionCurrentTeams] = useState([]);

  const hostControls = {
    startGame: async () => {
      const newGame = await startGameInSession(sessionId, sessionCurrentTeams);
      console.log('myGame', newGame)
      setSessionActiveGame(newGame);
    },

    shuffleTeams: () => {
      const teams = generateTeams(sessionPlayers, sessionTotalGames);
      console.log('myteams', teams)
      setSessionCurrentTeams(teams);
    } 
  };

  const handleHostButton = (e) => {
    e.preventDefault();
    const command = e.target.name;
    if (hostControls[command]) hostControls[command]();
  };

  const syncStates = () => {
    setSessionPlayers([...mySession.activeUsers]);
    setSessionId(user.sessionPublicId);
    setSessionTotalGames(mySession.totalGames);
    if (mySession.activeGame) {
      const { activeGame } = mySession;
      const currentTime = getCurrentUnix();
      const gameInProgress = activeGame.isStarted && activeGame.endsOn > currentTime;
      setSessionActiveGame(gameInProgress ? activeGame : null);
    }
  };


  useEffect(async () => {
    if (user) {
      const session = await getExistingSessionData(user.sessionPublicId);
      if (session) setMySession(session);
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(mySession).length > 0) {
      syncStates();
      // Set up better datasync to not render page until all data is available (avoid fouc content)
    }
  }, [mySession]);



  return (
    <Container>
      {user && `Welcome back ${user.name}, you're in SESSION: ${sessionId}`}
      <Row xs="2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Players in Lobby({!sessionPlayers ? 0 : sessionPlayers.length})</CardTitle>
              <UsersTable players={sessionPlayers} type='users'/>
            </CardBody>
          </Card>
        </Col>
        <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Host Control Panel</CardTitle>
            
            <Button name="shuffleTeams" onClick={handleHostButton}>
              Shuffle Teams
            </Button>
            <Button name="startGame" onClick={handleHostButton}>
              Start Game
            </Button>
          </CardBody>
          </Card>
          {sessionActiveGame ?
            <ActiveGameCard 
              title="Players in Game"
              activeGame={sessionActiveGame}
            /> :
            <PendingGameCard
              title="Players in Queue"
            />
          }
        </Col>
      </Row>

    </Container>
  )
};

export default Host;