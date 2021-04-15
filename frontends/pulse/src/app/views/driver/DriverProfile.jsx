import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../appContext";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import {
  Card,
  Grid,
  TextField,
} from "@material-ui/core";

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

const DriverProfile = () => {
  const { user, authToken } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostCode] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [branchInfo, setBranchInfo] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      console.log(user);
      getDriverInfo();
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setHouseNumber(user.house_num);
      setPostCode(user.postal_code);
      setStreetNumber(user.street_num);
      setPhoneNumber(user.phone_num);
      setEmail(user.email);
    }
  }, [user]);

  const getDriverInfo = () => {
    axios
      .get("http://localhost:8000/restapi/driver/" + user.username + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        setSalary(res.data["salary"]);

        axios.get("http://localhost:8000/restapi/branch/" + res.data["branch"] + "/", {
          headers: { Authorization: "Bearer " + authToken },
        })
        .then((res) => {
          let b_info = ""
          b_info += res.data["house_num"] 
                + " " 
                + res.data["street_num"] 
                + ", " 
                + res.data["postal_code"];
          setBranchInfo(b_info);
        })
      });
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
                      value={user.username}
                      disabled="disabled"
                      fullWidth
                      type="text"
                      name="uName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      value={firstName}
                      fullWidth
                      type="text"
                      name="fName"
                      disabled="disabled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      value={lastName}
                      fullWidth
                      type="text"
                      name="lName"
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Email"
                      value={email}
                      fullWidth
                      type="text"
                      name="email"
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Phone Number"
                      value={phoneNumber}
                      fullWidth
                      type="text"
                      name="phoneNumber"
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="House Number"
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="houseNum"
                      value={houseNumber}
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Postal Code"
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="pCode"
                      value={postalCode}
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Street Number"
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="streetNum"
                      value={streetNumber}
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Salary ($/hr)"
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="salary"
                      value={salary}
                      disabled="disabled"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Branch Address"
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="branchInfo"
                      value={branchInfo}
                      disabled="disabled"
                    />
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

export default DriverProfile;
