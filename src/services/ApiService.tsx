import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";

export class ApiService {
  port: number = 5001;

  getUserTeamSettings(
    userId: string,
    teamId: string
  ): Promise<UserTeamSettings> {
    return axios
      .get(`https://localhost:${this.port}/userteamsettings`, {
        params: { userId, teamId },
      })
      .then((res) => res.data);
  }

  submitRatings(userId: string, ratings: UserRating[]): Promise<void> {
    return axios.post(`https://localhost:${this.port}/ratings`, ratings, {
      params: { userId },
    });
  }

  splitToTeams(teamId: string, numberOfTeams: number): Promise<TeamPlayers[]> {
    return axios
      .post(`https://localhost:${this.port}/teams/split`, null, {
        params: { teamId, numberOfTeams },
      })
      .then((res) => res.data);
  }

  getUserTeams(userId: string): Promise<TeamDetails[]> {
    return axios
      .get(`https://localhost:${this.port}/teams/${userId}`, {})
      .then((res) => {
        let teams: TeamDetails[] = [];
        (res.data as TeamDetails[]).forEach((team) => {
          team.date = new Date(team.date);
          teams.push(team);
        });
        return teams;
      });
  }

  joinTeam(userId: string, teamCode: string): Promise<TeamDetails> {
    return axios
      .post(`https://localhost:${this.port}/teams/join`, null, {
        params: { userId, teamCode },
      })
      .then((res) => {
        let importedTeam: TeamDetails = res.data;
        importedTeam.date = new Date(importedTeam.date);
        return importedTeam;
      });
  }

  createTeam(userId: string, teamName: string, date: string): Promise<string> {
    return axios
      .post(`https://localhost:${this.port}/teams`, null, {
        params: { userId, teamName, date },
      })
      .then((res) => {
        return res.data;
      });
  }
}
