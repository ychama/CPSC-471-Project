import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  makeStyles,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import TextButton from "../shared/TextButton";
import axios from "axios";

//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "true";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const { history } = props;

  let inputEmail = "";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(inputEmail);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostCode] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [houseNumberErrorMessage, setHouseNumberErrorMessage] = useState("");
  const [postalCodeErrorMessage, setPostalCodeErrorMessage] = useState("");
  const [streetNumberErrorMessage, setStreetNumberErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const clearErrors = () => {
    setEmailErrorMessage("");
  };

  const formFields = [
    {
      name: "First_Name",
      value: firstName,
      setError: setFirstNameErrorMessage,
    },
    {
      name: "Last_Name",
      value: lastName,
      setError: setLastNameErrorMessage,
    },
    {
      name: "Email",
      value: email,
      setError: setEmailErrorMessage,
    },
    {
      name: "Username",
      value: username,
      setError: setUsernameErrorMessage,
    },
    {
      name: "Phone Number",
      value: phoneNumber,
      setError: setPhoneNumberErrorMessage,
    },
    {
      name: "House Number",
      value: houseNumber,
      setError: setHouseNumberErrorMessage,
    },
    {
      name: "Postal Code",
      value: postalCode,
      setError: setPostalCodeErrorMessage,
    },
    {
      name: "Street Number",
      value: streetNumber,
      setError: setStreetNumberErrorMessage,
    },
    {
      name: "Card Number",
      value: cardNumber,
      setError: setCardNumberErrorMessage,
    },
  ];

  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateFields = () => {
    let areAllFieldsValid = true;
    formFields.forEach((field) => {
      if (field.name == "Email") {
        if (!validateEmail()) {
          console.log("Invalid email");
          field.setError(field.name + "Invalid email");
          areAllFieldsValid = false;
        }
      } else {
        if (field.value === "") {
          console.log("Found error field", field.name, field.value);
          field.setError(field.name + "is required");
          areAllFieldsValid = false;
        }
      }
    });

    if (newPassword !== "" && confirmPassword !== "") {
      if (newPassword !== confirmPassword) {
        areAllFieldsValid = false;
        setNewPasswordErrorMessage("Password's do not match");
        setConfirmPassword("Password's do not match");
      }
    } else {
      areAllFieldsValid = false;
      setNewPasswordErrorMessage("This is required");
      setConfirmPassword("This is required");
    }

    console.log("Finished validateFields", areAllFieldsValid);
    return new Promise((resolve, reject) => {
      if (areAllFieldsValid) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  const signUp = async () => {
    const createUser = {
      username: username,
      password: newPassword,
      first_name: firstName,
      last_name: lastName,
      email: email,
      user_role: "customer",
      phone_num: phoneNumber,
      house_num: houseNumber,
      postal_code: postalCode,
      street_num: streetNumber,
      card_num: cardNumber,
    };

    axios
      .post("http://localhost:8000/restapi/auth/", { createUser })
      .then((res) => {
        console.log(res);
        setSignUpSuccess(true);
        history.push("/session/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUpButton = async () => {
    const areFieldsValidated = await validateFields();
    if (areFieldsValidated) {
      console.log("Are all fields validated?", areFieldsValidated);
      await signUp();
      if (signUpSuccess) {
        console.log("No errors");
      }
    }
  };

  return (
    <div
      className="signup flex flex-center w-100 h-100vh"
      style={{ backgroundColor: "rgba(112, 212, 236, 0.1)" }}
    >
      <div className="p-8">
        <Card className="signup-card position-relative y-center">
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
                      variant="outlined"
                      label="Username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                        setUsernameErrorMessage("");
                      }}
                      value={username}
                      fullWidth
                      type="text"
                      name="uName"
                      error={usernameErrorMessage !== ""}
                      helperText={usernameErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        setFirstNameErrorMessage("");
                      }}
                      value={firstName}
                      fullWidth
                      type="text"
                      name="fName"
                      error={firstNameErrorMessage !== ""}
                      helperText={firstNameErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      onChange={(event) => {
                        setLastName(event.target.value);
                        setLastNameErrorMessage("");
                      }}
                      value={lastName}
                      fullWidth
                      type="text"
                      name="lName"
                      error={emailErrorMessage !== ""}
                      helperText={emailErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                        clearErrors();
                      }}
                      value={email}
                      fullWidth
                      type="text"
                      name="email"
                      error={emailErrorMessage !== ""}
                      helperText={emailErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Phone Number"
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                        clearErrors();
                      }}
                      value={phoneNumber}
                      fullWidth
                      type="text"
                      name="phoneNumber"
                      error={phoneNumberErrorMessage !== ""}
                      helperText={phoneNumberErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="House Number"
                      onChange={(event) => {
                        setHouseNumber(event.target.value);
                        setHouseNumberErrorMessage("");
                      }}
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="houseNum"
                      value={houseNumber}
                      error={houseNumberErrorMessage !== ""}
                      helperText={houseNumberErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Postal Code"
                      onChange={(event) => {
                        setPostCode(event.target.value);
                        setPostalCodeErrorMessage("");
                      }}
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="pCode"
                      value={postalCode}
                      error={postalCodeErrorMessage !== ""}
                      helperText={postalCodeErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Street Number"
                      onChange={(event) => {
                        setStreetNumber(event.target.value);
                        setStreetNumberErrorMessage("");
                      }}
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="streetNum"
                      value={streetNumber}
                      error={streetNumberErrorMessage !== ""}
                      helperText={streetNumberErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setNewPasswordErrorMessage("");
                      }}
                      fullWidth
                      value={newPassword}
                      type="password"
                      name="new-password"
                      error={newPasswordErrorMessage !== ""}
                      helperText={newPasswordErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Confirm Password"
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setConfirmPasswordErrorMessage("");
                      }}
                      fullWidth
                      variant="outlined"
                      type="password"
                      name="confirm-password"
                      value={confirmPassword}
                      error={confirmPasswordErrorMessage !== ""}
                      helperText={confirmPasswordErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      onChange={(event) => {
                        setCardNumber(event.target.value);
                        setCardNumberErrorMessage("");
                      }}
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="cardNum"
                      value={cardNumber}
                      error={cardNumberErrorMessage !== ""}
                      helperText={cardNumberErrorMessage}
                    />
                  </Grid>

                  <Grid item xs={12} style={{ display: "flex" }}>
                    <TextButton onClick={history.goBack}>Back</TextButton>
                    <div style={{ flexGrow: 1 }} />
                    <Button
                      onClick={handleSignUpButton}
                      variant="contained"
                      color="primary"
                    >
                      Sign Up
                    </Button>
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

export default Register;
