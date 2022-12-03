import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { TeamDetails } from "../models/TeamDetails";
import { ApiService } from "../services/ApiService";
import JoinTeamForm from "../components/JoinTeamForm";
import TeamCardLink from "../components/TeamCardLink";

export default function MyTeamsPage() {
  const apiService = new ApiService();
  const [userTeams, setUserTeams] = useState<TeamDetails[]>([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    apiService
      .getUserTeams(userId)
      .then((userTeams) => setUserTeams(userTeams));
  }, []);

  function joinTeam(teamCode: string) {
    apiService.joinTeam(userId, teamCode).then((importedTeam) => {
      setUserTeams([...userTeams, importedTeam]);
    });
  }

  const teamCards = userTeams.map((team, i) => (
    <TeamCardLink teamDetails={team} key={i}></TeamCardLink>
  ));

  return (
    <div className="card">
      <div className="flex flex-wrap card-container blue-container">
        {teamCards}
      </div>
      <JoinTeamForm handleSubmit={joinTeam} />
    </div>
  );
}
