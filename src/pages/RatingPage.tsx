import { useEffect, useState } from "react";
import RatingTable from "../components/RatingTable";
import { Button } from "primereact/button";
import { ApiService } from "../services/ApiService";
import { UserRating } from "../models/UserRating";
import { SessionStorage } from "../services/SessionStorage";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";
import { useParams } from "react-router-dom";

interface urlParams {
  teamId: string;
}

export const RatingPage = () => {
  const { teamId } = useParams<urlParams>();
  const apiService = new ApiService();
  const userId = new SessionStorage().getUserId();

  const [teamName, setTeamName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);
  const [numOfTeams, setNumOfTeams] = useState(3);
  const [playersPerTeams, setPlayersPerTeams] = useState(5);
  const [ratings, setRatings] = useState<UserRating[]>([]);

  useEffect(() => {
    apiService
      .getRatings(userId, teamId)
      .then((ratings) => setRatings(ratings));
    apiService.getTeamName(teamId).then((teamName) => setTeamName(teamName));
    apiService.isUserAdminOfTeam(userId, teamId).then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
  }, []);

  const onSubmitRatingsClicked = () => {
    setSubmitting(true);
    apiService
      .submitRatings(userId, ratings)
      .then(() => setSubmitting(false))
      .then(() => {
        if (isAdmin) {
          makeTeams();
        }
      });
  };

  function makeTeams() {
    const teams = apiService.createTeams(teamId, numOfTeams, playersPerTeams);
    console.log(teams);
    // TODO refer to the teams page
  }

  const setRating = (userId: Number, rating: number) => {
    let newRatings = [...ratings];
    let indexToChange = newRatings.findIndex((o) => o.userId === userId);
    newRatings[indexToChange].rating = rating;
    setRatings(newRatings);
  };

  function TeamsSettings() {
    return (
      <div className="field col-12 md:col-3">
        <label htmlFor="integeronly">Number of teams</label>
        <InputNumber
          inputId="integeronly"
          value={numOfTeams}
          onValueChange={(e) => setNumOfTeams(e.value ?? 0)}
        />
        <br />
        <label htmlFor="integeronly">Players per team</label>
        <InputNumber
          inputId="integeronly"
          value={playersPerTeams}
          onValueChange={(e) => setPlayersPerTeams(e.value ?? 0)}
        />
      </div>
    );
  }

  function SubmitRating() {
    if (isAdmin) {
      return (
        <>
          <div className="col-12 md:col-3">
            <Message
              severity="warn"
              text="{x} players hasn't submitted ratings"
            />
          </div>
          <TeamsSettings />
          <Button
            label="Make a team"
            icon="pi pi-check"
            loading={isSubmitting}
            onClick={onSubmitRatingsClicked}
          />
        </>
      );
    } else {
      return (
        <Button
          label="Submit"
          icon="pi pi-check"
          loading={isSubmitting}
          onClick={onSubmitRatingsClicked}
        />
      );
    }
  }

  return (
    <div>
      <h2>{teamName}</h2>
      <RatingTable ratings={ratings} onRatingsChanged={setRating} />
      <SubmitRating />
    </div>
  );
};
