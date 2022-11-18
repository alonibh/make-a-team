import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";

let port = 5001;
export class ApiService {
  getUserTeamSettings(
    userId: string,
    teamId: string
  ): Promise<UserTeamSettings> {
    return axios
      .get(`https://localhost:${port}/UserTeamSettings`, {
        params: { userId, teamId },
      })
      .then((res) => res.data);
  }

  submitRatings(userId: string, ratings: UserRating[]): Promise<void> {
    return axios.post(`https://localhost:${port}/SubmitRatings`, ratings, {
      params: { userId },
    });
  }

  createTeams(
    teamId: string,
    numberOfTeams: number,
    playersPerTeam: number
  ): Promise<TeamPlayers[]> {
    return axios
      .post(`https://localhost:${port}/CreateTeams`, null, {
        params: { teamId, numberOfTeams, playersPerTeam },
      })
      .then((res) => res.data);
  }

  getUserTeams(userId: string): Promise<TeamDetails[]> {
    return axios
      .get(`https://localhost:${port}/UserTeams`, { params: { userId } })
      .then((res) => {
        let teams: TeamDetails[] = [];
        (res.data as TeamDetails[]).forEach((team) => {
          team.date = new Date(team.date);
          teams.push(team);
        });
        return teams;
      });
  }

  importTeam(teamCode: string): Promise<TeamDetails> {
    return axios
      .post(`https://localhost:${port}/ImportTeam`, null, {
        params: { teamCode },
      })
      .then((res) => {
        let importedTeam: TeamDetails = res.data;
        importedTeam.date = new Date(importedTeam.date);
        return importedTeam;
      });
  }
}
