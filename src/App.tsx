import React, { useEffect } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { RatingPage } from "./pages/RatingPage";
import { SessionStorage } from "./services/SessionStorage";
import { MyTeamsPage } from "./pages/MyTeamsPage";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import "primeflex/primeflex.css";

function App() {
  const sessionStorage = new SessionStorage();
  useEffect(() => {
    sessionStorage.setUserId("0");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

  // return <RatingPage teamName="Sunday league" teamId="0" isAdmin={true} />;
}

export default App;
