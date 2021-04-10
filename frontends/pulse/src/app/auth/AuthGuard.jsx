import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AppContext from "app/appContext";
import axios from "axios";

const AuthGuard = (props) => {
  const { location, history, children } = props;
  const { pathname } = location;
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

      // axios
      //   .post("http://localhost:8000/api/token/", {
      //     username: currentUserInfo["username"],
      //     password: currentUserInfo["password"],
      //   })
      //   .then((res) => {
      //     const token = res.data["access"];
      //     console.log(token);
      //     setAuthToken(token);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [refreshAuth]);

  useEffect(() => {
    if (!authenticated) {
      localStorage.setItem("lastLocation", props.location.pathname);
      history.push("/session/signin");
    }
  }, [props]);

  useEffect(() => {
    const currentUserInfo = localStorage.getItem("currentUserInfo");
    const userRole = JSON.parse(currentUserInfo);
    const matched = routes.find((r) => r.path === pathname);
    setAuthenticated(true);

    // if (matched && matched.auth && matched.auth.length) {
    //   if (!matched.auth.includes(userRole?.attributes["custom:role"])) {
    //     history.push("/session/404");
    //   }
    // }
  }, [routes]);

  return authenticated ? <>{children}</> : null;
};

export default withRouter(AuthGuard);
