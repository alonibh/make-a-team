import { useState } from "react";
import { Calendar } from "primereact/calendar";

interface NewTeamProps {
  handleSubmit: (teamName: string, date: string) => void;
}

export default function NewTeamForm(props: NewTeamProps) {
  const [teamName, setTeamName] = useState<string>("");
  const [gameDate, setGameDate] = useState<Date | Date[] | undefined>(
    new Date()
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (gameDate) {
          props.handleSubmit(teamName, gameDate?.toLocaleString());
        }
      }}
    >
      <label>
        Enter team name to create:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <Calendar
          value={gameDate}
          onChange={(e) => setGameDate(e.value)}
          showTime
        />
      </label>
      <input type="submit" />
    </form>
  );
}
