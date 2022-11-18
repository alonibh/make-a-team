import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { TeamDetails } from "../models/TeamDetails";
import { ApiService } from "../services/ApiService";

interface TeamCardProps {
  teamDetails: TeamDetails;
}

function TeamCard(props: TeamCardProps) {
  return (
    <Link to={`/myTeams/${props.teamDetails.id}`}>
      <Card
        title={`${props.teamDetails.name}`}
        style={{ width: "25rem", marginBottom: "2em" }}
      >
        <div className="m-0" style={{ lineHeight: "1.5" }}>
          <ul>
            <li>Game Date: {props.teamDetails.date.toUTCString()}</li>
            <li>Players Count: {props.teamDetails.playersCount}</li>
          </ul>
        </div>
      </Card>
    </Link>
  );
}

interface ImportTeamProps {
  handleSubmit: (teamCode: string) => void;
}

function ImportTeam(props: ImportTeamProps) {
  const [teamCode, setTeamCode] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(teamCode);
      }}
    >
      <label>
        Enter team code to import:
        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default function MyTeamsPage() {
  const apiService = new ApiService();
  const [userTeams, setUserTeams] = useState<TeamDetails[]>([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    apiService
      .getUserTeams(userId)
      .then((userTeams) => setUserTeams(userTeams));
  }, []);

  function importTeam(teamCode: string) {
    apiService.importTeam(teamCode).then((importedTeam) => {
      setUserTeams([...userTeams, importedTeam]);
    });
  }

  const teamCards = userTeams.map((team, i) => (
    <TeamCard teamDetails={team} key={i}></TeamCard>
  ));

  return (
    <div className="card">
      <div className="flex flex-wrap card-container blue-container">
        {teamCards}
      </div>
      <ImportTeam handleSubmit={importTeam} />
    </div>
  );
}
