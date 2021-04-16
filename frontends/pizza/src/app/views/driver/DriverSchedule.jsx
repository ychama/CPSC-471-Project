import React, { useEffect, useState, useContext } from "react";
import PizzaLogo from "../../MatxLayout/SharedCompoents/PizzaMainLogo";
import classnames from "classnames";
import AppContext from "../../appContext";
import { makeStyles, Grid, Container } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
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

const useStylesCard = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
  },
});

const DriverSchedule = () => {
  const { user, authToken } = useContext(AppContext);
  const [shifts, setShifts] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const classCard = useStylesCard();
  const classes = useStyles();

  const getSchedule = () => {
    axios
      .get("http://localhost:8000/restapi/shift/" + user.username + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        console.log(res.data);
        setShifts(res.data);
      });
  };

  useEffect(() => {
    if (user) {
      getSchedule();
    }
  }, [user]);

  const createData =(start_date, start_time, duration, manager) => {
    return { start_date, start_time, duration, manager };
    }

    const updateRows = () => {
        let rows = [];
        for(let i = 0; i < shifts.length; i++){
            let date = new Date(shifts[i]["start_time"]);
            let onlyDate = moment(date).format("DD-MM-YYYY");
            let onlyTime = moment(date).format("HH:mm");
            let data = createData(onlyDate, onlyTime, shifts[i]["duration"], shifts[i]["manager"])
            rows.push(data);
        }
        setTableRows(rows);
    }

    useEffect(() => {
        if (shifts) {
          updateRows();
        }
      }, [shifts]);

  
  return (<div className={classes.root}>
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
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">Duration&nbsp;(hrs)</TableCell>
                <TableCell align="right">Manager</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {tableRows.map((row) => (
            <TableRow key={tableRows.indexOf(row)}>
                <TableCell component="th" scope="row">
                {row.start_date}
                </TableCell>
                <TableCell align="center">{row.start_time}</TableCell>
                <TableCell align="center">{row.duration}</TableCell>
                <TableCell align="center">{row.manager}</TableCell>
            </TableRow>
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
