import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

interface RatingSubmissionProps {
  isAdmin: boolean;
  isSubmitting: boolean;
  onSubmitRatingsClicked: (numOfTeams: number, playersPerTeams: number) => void;
}
export const RatingSubmission = (props: RatingSubmissionProps) => {
  const [numOfTeams, setNumOfTeams] = useState(3);
  const [playersPerTeams, setPlayersPerTeams] = useState(5);

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
    if (props.isAdmin) {
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
            loading={props.isSubmitting}
            onClick={() =>
              props.onSubmitRatingsClicked(numOfTeams, playersPerTeams)
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
          onClick={() =>
            props.onSubmitRatingsClicked(numOfTeams, playersPerTeams)
          }
        />
      );
    }
  }

  return <SubmitRating />;
};

export default RatingSubmission;
