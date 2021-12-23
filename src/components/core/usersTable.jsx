import React from 'react';
import { Table } from 'reactstrap';

const UsersTable = ({
  players
}) => (
  
<Table borderless striped>
  <thead>
    <tr>
      <th>
        Players
      </th>
      <th>
        Name
      </th>
      <th>
        Skill Level
      </th>
      <th>
        Game Count
      </th>
    </tr>
  </thead>
  <tbody>
    {players.map((player, index) => 
      <tr>
        <th scope="row">
          {index + 1}
        </th>
        <td>
          {player.isHost ?
            <strong>{player.name}</strong> :
            <span>{player.name}</span>
          }
        </td>
        <td>
          {player.skillLevel}
        </td>
        <td>
          {player.gameCount}
        </td>
      </tr>
    )}
  </tbody>
</Table>
);

export default UsersTable;