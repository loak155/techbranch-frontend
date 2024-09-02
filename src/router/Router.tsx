import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { LoginUserProvider } from "../hooks/providers/useLoginUserProvider";
import { Signup } from "../components/pages/Signup";
import { SignupCallback } from "../components/pages/SignupCallback";
import { GoogleLogin } from "../components/pages/GoogleLogin";
import { Bookmark } from "../components/pages/Bookmark";

export const Router = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/bookmark" key="/bookmark">
          <Bookmark />
        </Route>
        <Route path="/signup" key="/signup">
          <Signup />
        </Route>
        <Route path="/signup/callback" key="/signup/callback">
          <SignupCallback />
        </Route>
        <Route path="/login" key="/login">
          <Login />
        </Route>
        <Route path="/oauth/google/callback" key="/oauth/google/callback">
          <GoogleLogin />
        </Route>
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
