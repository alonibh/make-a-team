import { Team } from "../models/Team";
import { UserRating } from "../models/UserRating";

export class ApiService {
  getRatings(userId: string, teamId: string) {
    return fetch("/data/ratings.json")
      .then((res) => res.json())
      .then((d) => d.ratings);
  }

  submitRatings(userId: string, ratings: UserRating[]) {
    return new Promise((res) => setTimeout(res, 1000));
  }

  createTeams(
    teamId: string,
    numberOfTeams: number,
    playersPerTeam: number
  ): Team[] {
    let team1: Team = { playersInTeam: ["P1", "P2", "P3", "P4", "P5"] };
    let team2: Team = { playersInTeam: ["P6", "P7", "P8", "P9", "P10"] };
    let team3: Team = { playersInTeam: ["P11", "P12", "P13", "P14", "P15"] };
    const teams: Team[] = [team1, team2, team3];
    return teams;
  }

  getTeamName(teamId: string): Promise<string> {
    return Promise.resolve("Sunday League");
  }

  isUserAdminOfTeam(
    userId: string,
    teamId: string | undefined
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
