import React, { useEffect } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { SessionStorage } from "./services/SessionStorage";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import "primeflex/primeflex.css";
import { UserContext } from "./pages/contexts/UserContext";
import MyTeamsPage from "./pages/MyTeamsPage";
import RatingPage from "./pages/RatingPage";

function App() {
  const sessionStorage = new SessionStorage();
  useEffect(() => {
    sessionStorage.setItem("userId", "1");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userId = sessionStorage.getItem("userId");

  return (
    <>
      <UserContext.Provider value={userId ?? ""}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={MyTeamsPage} />
            <Route path="/myTeams/:teamId" component={RatingPage} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
