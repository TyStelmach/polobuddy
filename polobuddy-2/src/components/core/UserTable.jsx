import React from 'react';
import { Table } from 'reactstrap';

const UsersTable = ({
  players,
  type = 'users'
}) => {
  const columns = type === 'users' 
    ? ['Players', 'Name', 'Skill Level', 'Game Count']
    : [ 'Players', 'Name', 'Skill Level'];

  return (
    <Table borderless striped>
      <thead>
        <tr>
          {columns.map((colName, index) => 
            <th key={index}>
              {colName}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => 
          <tr key={index}>
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
              {player.skillName}
            </td>
              {type === 'users' && (
                <td>
                  {player.gameCount}
                </td>
              )}
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default UsersTable;