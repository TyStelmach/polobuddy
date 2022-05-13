import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import UsersTable from "../core/UserTable";


const PendingGameCard = ({
  title,
  description,
  children,
  pendingGame
}) => (
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        {title}
      </CardTitle>
      <CardText>
        {description}
      </CardText>
      {pendingGame && pendingGame.map((team, index) =>
        <UsersTable key={`team-table-${index+1}`} players={team.players} type="game"/>
      )}      
    </CardBody>
  </Card>
);

export default PendingGameCard;