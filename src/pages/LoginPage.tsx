import { useState } from "react";

interface LoginPageProps {
  setUser: (user: string) => void;
}

export default function LoginPage(props: LoginPageProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    props.setUser(value);
  }

  function handleChange(event: any) {
    setValue(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
