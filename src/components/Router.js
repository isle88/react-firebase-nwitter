import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "routes/Profile";
import { Auth } from "../routes/Auth";
import { Home } from "../routes/Home";
import { Navigation } from "./Navigation";

export const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
