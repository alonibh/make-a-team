import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

interface RatingSubmissionProps {
  isAdmin: boolean;
  isSubmitting: boolean;
  onSubmitRatingsClicked: (numOfTeams: number, playersPerTeams: number) => void;
}

export default function RatingSubmission(props: RatingSubmissionProps) {
  const [teamsForm, setTeamsForm] = useState({
    numOfTeams: 3,
    playersPerTeams: 5,
  });

  function setNumOfTeams(numOfTeams: number) {
    setTeamsForm({ ...teamsForm, numOfTeams: numOfTeams });
  }

  function setPlayersPerTeams(playersPerTeams: number) {
    setTeamsForm({ ...teamsForm, playersPerTeams: playersPerTeams });
  }

  if (props.isAdmin) {
    return (
      <>
        <div className="col-12 md:col-3">
          <Message
            severity="warn"
            text="{x} players hasn't submitted ratings"
          />
        </div>
        <div className="field col-12 md:col-3">
          <label htmlFor="integeronly">Number of teams</label>
          <InputNumber
            inputId="integeronly"
            value={teamsForm.numOfTeams}
            onValueChange={(e) => setNumOfTeams(e.value ?? 0)}
          />
          <br />
          <label htmlFor="integeronly">Players per team</label>
          <InputNumber
            inputId="integeronly"
            value={teamsForm.playersPerTeams}
            onValueChange={(e) => setPlayersPerTeams(e.value ?? 0)}
          />
        </div>
        <Button
          label="Make a team"
          icon="pi pi-check"
          loading={props.isSubmitting}
          onClick={() =>
            props.onSubmitRatingsClicked(
              teamsForm.numOfTeams,
              teamsForm.playersPerTeams
            )
          }
        />
      </>
    );
  } else {
    return (
      <Button
        label="Submit"
        icon="pi pi-check"
        loading={props.isSubmitting}
        onClick={() => props.onSubmitRatingsClicked(0, 0)}
      />
    );
  }
}
