import { TeamPlayers } from "../models/TeamPlayers";
import { TeamDetails } from "../models/TeamDetails";
import { UserRating } from "../models/UserRating";
import axios from "axios";
import { UserTeamSettings } from "../models/UserTeamSettings";

//why "let" and why its outside the class?
let port = 5001;

// apis should not be with big letterCase
// you should follow the best practicies for RESTful apis:
// https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/
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

  //should not call the API "submitRatings" just POST /ratings
  submitRatings(userId: string, ratings: UserRating[]): Promise<void> {
    return axios.post(`https://localhost:${port}/SubmitRatings`, ratings, {
      params: { userId },
    });
  }

  //I dont think its should be an API.. the split could be done in the frontend
  // but if if you want to do it in backend, call it:
  // teams/split
  splitToTeams(teamId: string, numberOfTeams: number): Promise<TeamPlayers[]> {
    return axios
      .post(`https://localhost:${port}/SplitToTeams`, null, {
        params: { teamId, numberOfTeams },
      })
      .then((res) => res.data);
  }

  //GET /teams/:userId
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

  // the use of "import" is really weird
  // what do you mean by import?
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
