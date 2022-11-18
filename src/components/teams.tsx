import { TeamPlayers } from "../models/TeamPlayers";
import { Card } from "primereact/card";

interface TeamProps {
  teams: TeamPlayers[];
}

interface PlayersListProps {
  players: string[];
}

interface TeamCardProps {
  team: TeamPlayers;
  i: number;
}

export const Teams = (props: TeamProps) => {
  function PlayersList(props: PlayersListProps) {
    return (
      <ul>
        {props.players.map((player, i) => (
          <li key={i}>{player}</li>
        ))}
      </ul>
    );
  }

  function TeamCard(props: TeamCardProps) {
    const card = (
      <Card
        title={`Team ${props.i}`}
        style={{ width: "25rem", marginBottom: "2em" }}
      >
        <div className="m-0" style={{ lineHeight: "1.5" }}>
          <PlayersList players={props.team.names} />
        </div>
      </Card>
    );
    return card;
  }

  return (
    <div className="card">
      <div className="flex flex-wrap card-container blue-container">
        {props.teams.map((team, i) => (
          <TeamCard i={i + 1} team={team} key={i}></TeamCard>
        ))}
      </div>
    </div>
  );
};

export default Teams;