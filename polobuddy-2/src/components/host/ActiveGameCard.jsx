import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import UsersTable from "../core/UserTable";
import Timer from '../game/GameTimer';

const ActiveGameCard = ({
  title,
  description,
  children,
  activeGame
}) => {
  console.log('active', activeGame)
return (
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        {title}
      </CardTitle>
      <CardText>
        test

      </CardText>
      <Timer endsOn={activeGame?.endsOn} duration={activeGame?.duration} />
      {activeGame && activeGame.teams.map((team, index) =>
        <UsersTable key={`team-table-${index+1}`} players={team.players} type="game"/>
      )}
    </CardBody>
  </Card>
)};

export default ActiveGameCard;