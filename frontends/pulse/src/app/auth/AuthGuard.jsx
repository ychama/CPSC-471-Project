import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AppContext from "app/appContext";

const AuthGuard = (props) => {
  const { history, children } = props;
  const { routes, setUser, refreshAuth, setAuthToken } = useContext(AppContext);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let currentUserInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    let authTok = localStorage.getItem("authToken");

    if (currentUserInfo) {
      console.log(authTok);
      setUser({
        ...currentUserInfo,
      });

      setAuthToken(authTok);
    }
  }, [refreshAuth]);

  useEffect(() => {
    if (!authenticated) {
      localStorage.setItem("lastLocation", props.location.pathname);
      history.push("/session/signin");
    }
  }, [props]);

  useEffect(() => {
    setAuthenticated(true);
  }, [routes]);

  return authenticated ? <>{children}</> : null;
};

export default withRouter(AuthGuard);
