import { render } from '@testing-library/react';
import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import UsersTable from "../core/UserTable";
import Timer from '../game/GameTimer';

const ActiveGameCard = ({
  title,
  description,
  activeGame,
}) => {
const renderTimer = () => {
  return (
    <Timer 
      endsOn={activeGame?.endsOn} 
      isPaused={activeGame?.isPaused}
    />
  )
};

useEffect(() => {
  renderTimer();
}, [])

return (
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        {title}
      </CardTitle>
      <CardText>
        test

      </CardText>
      {renderTimer()}
      {activeGame && activeGame.teams.map((team, index) =>
        <UsersTable key={`team-table-${index+1}`} players={team.players} type="game"/>
      )}
    </CardBody>
  </Card>
)};

export default ActiveGameCard;