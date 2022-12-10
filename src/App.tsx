import React, { useEffect } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "primeflex/primeflex.css";
import MyTeamsPage from "./pages/MyTeamsPage";
import RatingPage from "./pages/RatingPage";
import LoginPage from "./pages/LoginPage";
import useUser from "./hooks/UseUser";

function App() {
  const { user, setUser } = useUser();

  if (!user) {
    return <LoginPage setUser={setUser} />;
  } else
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={MyTeamsPage} />
            <Route path="/myTeams/:teamId" component={RatingPage} />
          </Switch>
        </BrowserRouter>
      </>
    );
}

export default App;
