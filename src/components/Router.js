import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "routes/Profile";
import { Auth } from "../routes/Auth";
import { Home } from "../routes/Home";
import { Navigation } from "./Navigation";

export const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
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
