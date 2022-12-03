import { useState } from "react";

interface JoinTeamProps {
  handleSubmit: (teamCode: string) => void;
}

export default function JoinTeamForm(props: JoinTeamProps) {
  const [teamCode, setTeamCode] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(teamCode);
      }}
    >
      <label>
        Enter team code to join:
        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
