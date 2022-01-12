import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, } from 'reactstrap';
import StandardCardBody from "../core/standardCardBody";
import UsersTable from "../core/usersTable";
import TeamsTable from "../core/teamsTable";
import HostOptions from "../host/hostOption";

const { getAllPlayersInSession } = require('../../services/player');
const { getSessionById } = require('../../services/session'); 
const { getActiveGameBySession } = require('../../services/game');
const { createTeams } = require('../../libs/gameUtilities');

const Host = () => {
  const [players, setPlayers] = useState([]);
  const [session, setSession] = useState({});
  const [activeGame, setActiveGame] = useState({});
  const [teams, setTeams] = useState([]);

  const hostControls = {
    startGame: '',
    shuffleTeams: () => setTeams(createTeams(players, session.totalGames)),
  };
  
  const handleHostButton = (e) => {
    e.preventDefault();
    const command = e.target.name;
    console.log(command);
    if (hostControls[command]) hostControls[command]();
  };

  const getCurrentSession = async (sessionId) => {
    const session = await getSessionById(sessionId);
    setSession(session);
  }

  const fetchPlayers = async () => {
    const playersInSession = await getAllPlayersInSession('-MtB-eomPO8zN_nqKLlK');
    setPlayers(...players, playersInSession);
  };

  useEffect(async () => {
    await getCurrentSession('-MtB-eomPO8zN_nqKLlK')
    await fetchPlayers();
  }, []);

  return (
    <Container>
      <Row xs="2">
        <Col>
          <Card>
            <StandardCardBody title="Host Controls">
              <HostOptions 
                description={'Generate teams randomly based on players skill level and weight'}
                buttonHandler={handleHostButton}
              />

            </StandardCardBody>
          </Card>
        </Col>

        <Col>
          <Card>
            <StandardCardBody title="Game Controls">
              {
                teams.map((team, index) => <TeamsTable players={team.players} index={index+1} key={index+1} />)
              }
            </StandardCardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Host;