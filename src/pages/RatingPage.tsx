import { useContext, useEffect, useState } from "react";
import RatingTable from "../components/RatingTable";
import { ApiService } from "../services/ApiService";
import { useParams } from "react-router-dom";
import RatingSubmission from "../components/RatingSubmission";
import Popup from "../components/popup/Popup";
import { TeamPlayers } from "../models/TeamPlayers";
import { UserContext } from "./contexts/UserContext";
import { UserTeamSettings } from "../models/UserTeamSettings";
import TeamsList from "../components/TeamsList";

interface urlParams {
  teamId: string;
}

export default function RatingPage() {
  const { teamId } = useParams<urlParams>();
  const apiService = new ApiService();
  const userId = useContext(UserContext);

  const [teamSettings, setTeamSettings] = useState<UserTeamSettings>({
    isUserAdminOfTeam: false,
    name: "",
    ratings: [],
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState<TeamPlayers[]>([]);

  useEffect(() => {
    // TODO - add error handling for all http requests
    apiService.getUserTeamSettings(userId, teamId).then((res) => {
      setTeamSettings(res);
    });
  }, []);

  function togglePopup() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function onSubmitRatingsClicked(numOfTeams: number) {
    setSubmitting(true);
    // TODO - make all of the api calls async
    apiService.submitRatings(userId, teamSettings.ratings).then(() => {
      setSubmitting(false);
      if (teamSettings.isUserAdminOfTeam) {
        apiService.splitToTeams(teamId, numOfTeams).then((teams) => {
          setTeams(teams);
          togglePopup();
        });
      }
    });
  }

  const setRating = (userId: Number, rating: number) => {
    let newRatings = [...teamSettings.ratings];
    const indexToChange = newRatings.findIndex((o) => o.userId === userId);
    newRatings[indexToChange].rating = rating;
    setTeamSettings({ ...teamSettings, ratings: newRatings });
  };

  return (
    <div className="m-3">
      <h2>{teamSettings.name}</h2>
      <RatingTable
        ratings={teamSettings.ratings}
        onRatingsChanged={setRating}
      />
      <RatingSubmission
        isAdmin={teamSettings.isUserAdminOfTeam}
        isSubmitting={isSubmitting}
        onSubmitRatingsClicked={onSubmitRatingsClicked}
      ></RatingSubmission>
      {isOpen && (
        <Popup
          children={
            <>
              <TeamsList teams={teams}></TeamsList>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
