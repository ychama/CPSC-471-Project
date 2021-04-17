import React, { useEffect, useState, useContext } from "react";
import PizzaLogo from "../../MatxLayout/SharedCompoents/PizzaMainLogo";
import classnames from "classnames";
import AppContext from "../../appContext";
import { makeStyles, Grid, Container, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "ffffff",
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    maxWidth: "100%",
  },
  table: {
    minWidth: 650,
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStylesCard = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
  },
});

const Row = (props) => {
  const { row, postShift, deleteShift } = props;
  const [open, setOpen] = useState(false);
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [workDuration, setWorkDuration] = useState(0);
  const classes = useRowStyles();
  const { authToken } = useContext(AppContext);

  const toggleShiftModal = () => {
    if (shiftModalOpen) setShiftModalOpen(false);
    else setShiftModalOpen(true);
  };

  const addShift = () => {
    let currentTime = Date.now();
    let shiftTime = new Date(selectedDate);

    if (workDuration <= 0) {
      alert("Invalid Work Duration");
    } else if (shiftTime < currentTime) {
      alert("Pick a date in the future");
    } else {
      postShift(shiftTime, workDuration, row.username);
      toggleShiftModal();
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.phoneNumber}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Shifts
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleShiftModal}
              >
                Add Shift
              </Button>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Duration&nbsp;(hrs)</TableCell>
                    <TableCell>Remove Shift</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row["shifts"].map((shift) => (
                    <TableRow key={row["shifts"].indexOf(shift)}>
                      <TableCell component="th" scope="row">
                        {shift.onlyDate}
                      </TableCell>
                      <TableCell align="center">{shift.onlyTime}</TableCell>
                      <TableCell align="center">{shift.duration}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            deleteShift(shift.id);
                          }}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={shiftModalOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the Start Time and Duration of the Shift.
          </DialogContentText>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start Time"
              type="datetime-local"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
              }}
              minDate={new Date()}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Work Duration (hrs)"
            value={workDuration}
            onChange={(event) => {
              setWorkDuration(event.target.value);
            }}
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleShiftModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addShift} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const DriverSchedule = () => {
  const { user, authToken } = useContext(AppContext);
  const [drivers, setDrivers] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const classCard = useStylesCard();
  const classes = useStyles();

  const postShift = (time, dur, driver) => {
    axios
      .post(
        "http://localhost:8000/restapi/shift/",
        {
          start_time: time.toISOString(),
          duration: dur,
          manager: user.username,
          driver: driver,
        },
        {
          headers: { Authorization: "Bearer " + authToken },
        }
      )
      .then((res) => {
        getManagerBranch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteShift = (id) => {
    axios
      .delete("http://localhost:8000/restapi/shift/" + id + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        getManagerBranch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getManagerBranch = () => {
    axios
      .get("http://localhost:8000/restapi/manager/" + user.username + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        getSchedule(res.data["branch"]);
      });
  };

  const getSchedule = (branchID) => {
    axios
      .get("http://localhost:8000/restapi/driver/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        let managedDrivers = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["branch"] == branchID) {
            managedDrivers.push(res.data[i]);
          }
        }

        setDrivers(managedDrivers);
      });
  };

  useEffect(() => {
    if (user) {
      getManagerBranch();
    }
  }, [user]);

  const createData = (username, name, email, phoneNumber, address, shifts) => {
    return { username, name, email, phoneNumber, address, shifts };
  };

  const updateRows = () => {
    let rows = [];
    for (let i = 0; i < drivers.length; i++) {
      let name =
        drivers[i]["user"]["first_name"] +
        " " +
        drivers[i]["user"]["last_name"];
      let address =
        drivers[i]["user"]["house_num"] +
        " " +
        drivers[i]["user"]["street_num"] +
        ", " +
        drivers[i]["user"]["postal_code"];
      let cleanShifts = [];
      for (let j = 0; j < drivers[i]["shifts"].length; j++) {
        let shift = drivers[i]["shifts"][j];
        let date = new Date(shift["start_time"]);
        let onlyDate = moment(date).format("DD-MM-YYYY");
        let onlyTime = moment(date).format("HH:mm");
        cleanShifts.push({
          onlyDate,
          onlyTime,
          duration: shift["duration"],
          id: shift["id"],
        });
      }
      let data = createData(
        drivers[i]["user"]["username"],
        name,
        drivers[i]["user"]["email"],
        drivers[i]["user"]["phone_num"],
        address,
        cleanShifts
      );
      rows.push(data);
    }
    setTableRows(rows);
  };

  useEffect(() => {
    if (drivers) {
      updateRows();
    }
  }, [drivers]);

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
        <Grid
          container
          direction="row"
          spacing={2}
          justify="center"
          alignItems="flex-start"
          xs={12}
          className={classes.gridRowTwo}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((row) => (
                  <Row
                    key={tableRows.indexOf(row)}
                    row={row}
                    postShift={postShift}
                    deleteShift={deleteShift}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </div>
  );
};

export default DriverSchedule;
