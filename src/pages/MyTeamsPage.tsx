import { useContext, useEffect, useState } from "react";
import useUser from "../hooks/UseUser";
import { TeamDetails } from "../models/TeamDetails";
import { ApiService } from "../services/ApiService";
import JoinTeamForm from "../components/JoinTeamForm";
import TeamCardLink from "../components/TeamCardLink";
import NewTeamForm from "../components/NewTeamForm";
import { useHistory } from "react-router-dom";

export default function MyTeamsPage() {
  const history = useHistory();
  const apiService = new ApiService();
  const [userTeams, setUserTeams] = useState<TeamDetails[]>([]);
  const { user } = useUser();

  useEffect(() => {
    apiService.getUserTeams(user).then((userTeams) => setUserTeams(userTeams));
  }, []);

  function joinTeam(teamCode: string) {
    apiService.joinTeam(user, teamCode).then((importedTeam) => {
      setUserTeams([...userTeams, importedTeam]);
    });
  }

  function createNewTeam(teamName: string, date: string) {
    apiService.createTeam(user, teamName, date).then((teamId) => {
      history.push(`/myTeams/${teamId}`);
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
      <NewTeamForm handleSubmit={createNewTeam} />
    </div>
  );
}
