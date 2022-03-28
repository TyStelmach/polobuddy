import React from 'react';
import { Table } from 'reactstrap';

const TeamsTable = ({
  players,
  index
}) => {
  const teamName = index === 1 ? 'Team One' : 'Team Two';
  const teamKey = index === 1 ? 't-one' : 't-two';

  return (
    <Table borderless striped key={index}>
      <thead>
        <tr>
          <th>
            {teamName}
          </th>
          <th>
            Name
          </th>
          <th>
            Skill Level
          </th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, playerIndex) => 
          <tr key={`${teamKey}-${playerIndex}`}>
            <th scope="row">
              {playerIndex + 1}
            </th>
            <td>
              {player.name}
            </td>
            <td>
              {player.skillLevel}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
export default TeamsTable;