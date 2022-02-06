import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup } from 'reactstrap';
import UsersTable from "../core/usersTable";

const HostOption = styled.div`
  margin: 0 1rem 0 0;
  display: block;
`;

const HostOptions = ({
  description,
  players,
  buttonHandler
}) => (
  <div>
    <p>{description}</p>
    <ButtonGroup>
      <HostOption>
        <Button name="shuffleTeams" onClick={buttonHandler}>
          Shuffle Teams
        </Button>
      </HostOption>
      <HostOption>
        <Button name="startGame" onClick={buttonHandler}>
          Start Game
        </Button>
      </HostOption>
    </ButtonGroup>
  </div>
);

export default HostOptions;
