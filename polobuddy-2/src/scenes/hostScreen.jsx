import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../libs/firebase-config'; 

import UsersTable from "../components/core/UserTable";
import ContentCard from '../components/core/ContentCard';
import FormModal from "../components/home/FormModal";
import ActiveGameCard from "../components/host/ActiveGameCard";
import PendingGameCard from "../components/host/PendingGameCard";
import Loader from "../components/core/LoadingScreen";
import { getExistingSessionData, refreshSessionData } from '../services/session';
import { generateTeams, startGameInSession, togglePauseInActiveGame } from '../services/game';
import { getCurrentUnix } from "../libs/utilities";


const Host = ({ user }) => {
  const [snapshot, setSnapshot] = useState(null);
  const [mySessionId, setMySessionId] = useState('');
  const [mySession, setMySession] = useState(null);
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [sessionActiveGame, setSessionActiveGame] = useState(null);
  const [sessionTotalGames, setSessionTotalGames] = useState('');
  const [sessionCurrentTeams, setSessionCurrentTeams] = useState([]);

  const [activeGamePause, setActiveGamePause] = useState(false);

  const refreshSession = async () => {
    // const session = await getExistingSessionData(user.sessionPublicId);
    // const session = await refreshSessionData(user.sessionPublicId);
    // if (session) setMySession(session);
  }

  const hostControls = {
    startGame: async () => {
      const newGame = await startGameInSession(mySessionId, sessionCurrentTeams);
      setSessionActiveGame(newGame);
      setActiveGamePause(false);
    },
    shuffleTeams: () => {
      const teams = generateTeams(sessionPlayers, sessionTotalGames);
      setSessionCurrentTeams(teams);
    },
    pauseGame: async () => {
      const pauseState = await togglePauseInActiveGame(mySessionId, sessionActiveGame.endsOn, activeGamePause);
      setActiveGamePause(pauseState);
  },
}

  const handleHostButton = async (e) => {
    e.preventDefault();
    const command = e.target.name;
    if (hostControls[command]) hostControls[command]();
    };

  const syncStates = () => {
    setSessionPlayers([...mySession.activeUsers]);
    setMySessionId(user.sessionPublicId);
    setSessionTotalGames(mySession.totalGames);
    if (mySession.activeGame) {
      const { activeGame } = mySession;
      const currentTime = getCurrentUnix();
      const gameInProgress = activeGame.isStarted && activeGame.endsOn > currentTime;
      setSessionActiveGame(gameInProgress ? activeGame : null);
    }
  };

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "Sessions", user.sessionPublicId), docSnapshot => {
        setSnapshot(docSnapshot.data());
      });
      return () => {
        unsub();
      }
    }
  }, [user]);

  useEffect(() => {
    if (mySession === null) {
      setMySession(snapshot);
    } else {
      setMySession({...snapshot, ...mySession})
    }

  }, [snapshot]);

  useEffect(() => {
    if (mySession !== null) {
      console.log('syncing', mySession)
      syncStates();
      // get snapshot to sync up all app states
    }
  },[mySession]);

  return (
    <Container>
      {!mySessionId && <Loader />}
      {user && `Welcome back ${user.name}, you're in SESSION: ${mySessionId}`}
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
            <Button name="pauseGame" onClick={handleHostButton}>
              Pause Game
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
              pendingGame={sessionCurrentTeams}
            />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Host;