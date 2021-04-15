import React, { useState, useEffect, useContext } from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import TextButton from "../shared/TextButton";
import TextField from "../shared/TextField";
import AppContext from "../../appContext";
import axios from "axios";

const SignIn = (props) => {
  const { history } = props;

  const [username, setUserName] = useState("");
  const [usernameErrorMessage, setUserNameErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [authToken, setAuthToken] = useState("");

  const { refreshAuth, setRefreshAuth } = useContext(AppContext);

  const clearErrors = () => {
    setUserNameErrorMessage("");
    setPasswordErrorMessage("");
  };

  const redirect = () => {
    const currentUserInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    const role = currentUserInfo["user_role"];
    if (localStorage.getItem("lastLocation") != null) {
      const lastLocation = localStorage.getItem("lastLocation");
      localStorage.removeItem("lastLocation");
      history.push(lastLocation);
      return;
    }
    console.log(role.toUpperCase());
    switch (role.toUpperCase()) {
      case "CUSTOMER":
        history.push("/dashboard", { authToken });
        break;
      case "DRIVER":
        history.push("/driverdashboard", { authToken });
        break;
      case "MANAGER":
        history.push("/managerdashboard", { authToken });
        break;
      default:
        history.push("/session/404");
        break;
    }
  };

  const handleForgotPassword = async () => {
    history.push("/session/forgot-password", { username });
  };

  const handleRegister = async () => {
    history.push("/session/register");
  };

  const handleSignin = async () => {
    const validationData = new Map();
    if (!username) {
      setUserNameErrorMessage("Username is required");
    } else if (!password) {
      setPasswordErrorMessage("Password field is required");
    } else {
      await getToken();
    }
  };

  const signIn = async (token) => {
    axios
      .get("http://localhost:8000/restapi/auth/" + username + "/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res) {
          setRefreshAuth(!refreshAuth);
          localStorage.setItem("currentUserInfo", JSON.stringify(res.data));
          localStorage.setItem("authToken", token);
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getToken = async () => {
    axios
      .post("http://localhost:8000/api/token/", {
        username: username,
        password: password,
      })
      .then((res) => {
        setAuthToken(res.data["access"]);

        signIn(res.data["access"]);
      })
      .catch((err) => {
        setUserNameErrorMessage("Username is invalid");
        setPasswordErrorMessage("Password field is invalid");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("currentUserInfo") !== null) {
      redirect();
    }
  });

  return (
    <div
      className="signup flex flex-center w-100 h-100vh"
      style={{ backgroundColor: "rgba(112, 212, 236, 0.1)" }}
    >
      <div className="p-8">
        <Card
          className="signup-card position-relative y-center"
          style={{
            boxShadow:
              "0px 5px 5px -3px rgba(0, 0, 0, 0.06), 0px 8px 10px 1px rgba(0, 0, 0, 0.042), 0px 3px 14px 2px rgba(0, 0, 0, 0.036)",
          }}
        >
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <div className="p-32 flex flex-center flex-middle h-100">
                <img src="/assets/images/PizzaLogo.png" alt="logo" />
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <div
                style={{
                  marginRight: 30,
                  marginTop: 30,
                  marginBottom: 30,
                }}
              >
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignItems="stretch"
                >
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      onChange={(event) => {
                        setUserName(event.target.value);
                        clearErrors();
                      }}
                      value={username}
                      type="email"
                      name="email"
                      errorMessage={usernameErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearErrors();
                      }}
                      fullWidth
                      name="password"
                      type="password"
                      value={password}
                      errorMessage={passwordErrorMessage}
                      InputProps={{
                        endAdornment: (
                          <TextButton
                            onClick={handleForgotPassword}
                            size="small"
                          >
                            Forgot?
                          </TextButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container item spacing={1}>
                    <Grid item xs>
                      <div style={{ flexGrow: 1 }} />
                      <TextButton onClick={handleRegister}>Register</TextButton>
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex" }}>
                      <div style={{ flexGrow: 1 }} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSignin}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
