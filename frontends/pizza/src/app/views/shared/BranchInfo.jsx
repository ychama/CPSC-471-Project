import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../appContext";
import { makeStyles } from "@material-ui/core";
import PizzaLogo from "../../MatxLayout/SharedCompoents/PizzaMainLogo";
import classnames from "classnames";
import axios from "axios";
import {
  Card,
  Grid,
  TextField,
  Container
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "ffffff",
      height: "100%",
      maxHeight: "100%",
      width: "100%",
      maxWidth: "100%",
    },
    rootContainer: {
      height: "100%",
      maxHeight: "100%",
    },
    gridContainer: {
      height: "25%",
      maxHeight: "100%",
    },
    gridCell: {
      padding: 12,
    },
    gridRowOne: {
      flex: "0 0 150px",
      maxHeight: 150,
    },
    gridRowTwo: {
      flex: "1",
      overflowY: "auto",
      paddingBottom: "24px",
    },
  }));

const BranchInfo = () => {
    const { user, authToken } = useContext(AppContext);
    const [branchID, setBranchID] = useState(-1);
    const [branchPhone, setBranchPhone] = useState("");
    const [branchAddress, setBranchAddress] = useState("");

  const classes = useStyles();

    const getBranchInfo = () => {
        let endpoint = "driver";
        if(user["user_role"].toUpperCase() == "MANAGER")
            endpoint = "manager";

        axios
            .get("http://localhost:8000/restapi/" + endpoint + "/" + user.username + "/", {
              headers: { Authorization: "Bearer " + authToken },
            })
            .then((res) => {
                axios
                    .get("http://localhost:8000/restapi/branch/" + res.data["branch"] + "/", {
                        headers: { Authorization: "Bearer " + authToken },
                    })
                    .then((res) => {
                        setBranchID(res.data["branch_id"]);
                        setBranchPhone(res.data["phone_num"]);
                        setBranchAddress(res.data["house_num"] + " " + res.data["street_num"] + ", " + res.data["postal_code"]);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

  useEffect(() => {
    if (user) {
        getBranchInfo();
    }
  }, [user]);


  return (
  <div className={classes.root}>
      <Container maxWidth="lg" className={classes.rootContainer}>
      <Grid
          item
          container
          direction="column"
          className={classes.gridContainer}
        >
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            className={classnames(classes.gridCell, classes.gridRowOne)}
          >
            <PizzaLogo width={200} />
          </Grid>
        </Grid>
          <h3> <b>Branch ID: </b> {branchID} </h3>
          <h3> <b> Address: </b> {branchAddress} </h3>
          <h3> <b> Phone Number: </b> {branchPhone} </h3>
      </Container>
  </div>
  );
};

export default BranchInfo;
