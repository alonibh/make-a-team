import { useState } from "react";

export default function useUser() {
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ?? "";
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (user: string) => {
    localStorage.setItem("user", user);
    setUser(user);
  };

  return {
    setUser: saveUser,
    user,
  };
}
