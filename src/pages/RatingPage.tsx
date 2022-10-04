import { useEffect, useState } from "react";
import RatingTable from "../components/RatingTable";
import { ApiService } from "../services/ApiService";
import { UserRating } from "../models/UserRating";
import { SessionStorage } from "../services/SessionStorage";
import { useParams } from "react-router-dom";
import RatingSubmission from "../components/RatingSubmission";
import Popup from "../components/popup/Popup";
import Teams from "../components/teams";
import { Team } from "../models/Team";

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
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    apiService
      .getRatings(userId, teamId)
      .then((ratings) => setRatings(ratings));
    apiService.getTeamName(teamId).then((teamName) => setTeamName(teamName));
    apiService.isUserAdminOfTeam(userId, teamId).then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onSubmitRatingsClicked = (
    numOfTeams: number,
    playersPerTeams: number
  ) => {
    setSubmitting(true);
    apiService
      .submitRatings(userId, ratings)
      .then(() => setSubmitting(false))
      .then(() => {
        if (isAdmin) {
          displayTeams(numOfTeams, playersPerTeams);
        }
      });
  };

  function displayTeams(numOfTeams: number, playersPerTeams: number) {
    const teams = apiService.createTeams(teamId, numOfTeams, playersPerTeams);
    setTeams(teams);
    togglePopup();
  }

  const setRating = (userId: Number, rating: number) => {
    let newRatings = [...ratings];
    let indexToChange = newRatings.findIndex((o) => o.userId === userId);
    newRatings[indexToChange].rating = rating;
    setRatings(newRatings);
  };

  return (
    <div className="m-3">
      <h2>{teamName}</h2>
      <RatingTable ratings={ratings} onRatingsChanged={setRating} />
      <RatingSubmission
        isAdmin={isAdmin}
        isSubmitting={isSubmitting}
        onSubmitRatingsClicked={onSubmitRatingsClicked}
      ></RatingSubmission>
      {isOpen && (
        <Popup
          content={
            <>
              <Teams teams={teams}></Teams>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};
