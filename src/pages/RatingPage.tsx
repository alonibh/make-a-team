import { useContext, useEffect, useState } from "react";
import RatingTable from "../components/RatingTable";
import { ApiService } from "../services/ApiService";
import { useParams } from "react-router-dom";
import RatingSubmission from "../components/RatingSubmission";
import Popup from "../components/popup/Popup";
import Teams from "../components/teams";
import { TeamPlayers } from "../models/TeamPlayers";
import { UserContext } from "../components/UserContext";
import { UserTeamSettings } from "../models/UserTeamSettings";

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
    //better to have error handling when fetching from API
    //you should look at react-query package
    apiService.getUserTeamSettings(userId, teamId).then((res) => {
      setTeamSettings(res);
    });
  }, []);

  function togglePopup() {
    //you should do it with arrow function like:
    // set is open((prevOpen) => !prevOpen)
    setIsOpen(!isOpen);
  }

  //most of the times you dont need to use the function key word
  //just use arrow function: const onSubmitRatingsClicked => {}
  function onSubmitRatingsClicked(numOfTeams: number) {
    setSubmitting(true);
    //use async await
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
    //should always use consts and not lets
    let newRatings = [...teamSettings.ratings];
    let indexToChange = newRatings.findIndex((o) => o.userId === userId);
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
          // dont neee to use children, you just need to:
          // <Popup
          //  <Teams teams={teams}></Teams> />
          children={
            <>
              <Teams teams={teams}></Teams>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
