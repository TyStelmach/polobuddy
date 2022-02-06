import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import StandardCardBody from "../core/standardCardBody";
import UsersTable from "../core/usersTable";
import TeamsTable from "../core/teamsTable";
import HostOptions from "../host/hostOption";
const { getAllPlayersInSession } = require('../../services/player');
const { getSessionById } = require('../../services/session'); 
const { getActiveGameBySession, startActiveGame } = require('../../services/game');
const { createTeams } = require('../../libs/gameUtilities');

const Host = () => {
  const [players, setPlayers] = useState([]);
  const [session, setSession] = useState({});
  const [activeGame, setActiveGame] = useState({});
  const [teams, setTeams] = useState([]);

  const hostControls = {
    startGame: () => startActiveGame('-MtB-eomPO8zN_nqKLlK', session, teams),
    shuffleTeams: () => setTeams(createTeams(players, session.totalGames)),
  };
  
  const handleHostButton = (e) => {
    e.preventDefault();
    const command = e.target.name;
    if (hostControls[command]) hostControls[command]();
  };

  const getCurrentSession = async (sessionId) => {
    const session = await getSessionById(sessionId);
    setSession(session);
    setActiveGame(session.activeGame)
  }

  const fetchPlayers = async () => {
    const playersInSession = await getAllPlayersInSession('-MtB-eomPO8zN_nqKLlK');
    setPlayers(...players, playersInSession);
  };

  const renderTeamTable = () => teams.length > 0 ? true : false;
 
  useEffect(async () => {
    await getCurrentSession('-MtB-eomPO8zN_nqKLlK')
    await fetchPlayers();
  }, []);

  useEffect(() => {
    renderTeamTable();
  }, [teams])

  return (
    <Container>
      <Row xs="2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Players in Session({players.length})</CardTitle>
              <UsersTable players={players} />
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card>
            <StandardCardBody title="Session Controls">
              <HostOptions 
                description={'Generate teams randomly based on players skill level and weight'}
                buttonHandler={handleHostButton}
              />
            </StandardCardBody>
            {teams.length > 0 ?
              <CardBody>
                <CardTitle tag="h5">Players in Game - {activeGame.isStarted ? 'Started' : 'Not Started'}</CardTitle>
                <p>Gamespeed: {activeGame.speed}</p>
                  { teams.map((team, index) => <TeamsTable players={team.players} index={index+1} key={index+1} />) }
              </CardBody>
            :
              <CardBody>
                <p>Use the Session Controls to create a new game</p>
              </CardBody>
            }
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Host;