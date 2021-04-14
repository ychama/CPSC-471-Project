import React, { useEffect, useState, useContext, useRef } from "react";
import PizzaLogo from "../../MatxLayout/SharedCompoents/PizzaMainLogo";
import classnames from "classnames";
import AppContext from "../../appContext";
import { makeStyles, Grid, Container, CardHeader } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

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
    height: "100%",
    maxHeight: "100%",
  },
  gridCell: {
    padding: 12,
  },
  gridRowOne: {
    flex: "0 0 150px",
    maxHeight: 200,
  },
  gridRowTwo: {
    flex: "1",
    overflowY: "auto",
    paddingBottom: "300px",
  },
}));

const useStylesButton = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: "000000",
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

const PastOrders = () => {
  const { user, authToken } = useContext(AppContext);
  const [prevOrder, setPrevOrder] = useState([]);
  const classCard = useStylesCard();
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      getPastOrders();
    }
  }, [user]);

  const getPastOrders = () => {
    axios
      .get("http://localhost:8000/restapi/order/" + user.username + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        console.log(res.data);
        setPrevOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            alignItems="flex-start"
            xs={12}
            className={classes.gridRowTwo}
          >
            {prevOrder.map((element) => {
              console.log(element);
              let orderDate = new Date(element["order_date"]);
              let foodItems = "";
              let totalPrice = 0.0;
              for (let i = 0; i < element["food_items"].length; i++) {
                let foodItem = element["food_items"][i];
                foodItems += foodItem["name"] + ", ";
                totalPrice += foodItem["price"];
              }
              return (
                <Grid item xs={6} key={prevOrder.indexOf(element)}>
                  <Card className={classCard.root}>
                    <CardHeader title="Order Details" />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Order Date: {orderDate.toUTCString()}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Items: {foodItems}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Price: ${totalPrice}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Order Status:{" "}
                        {element["order_delivered"] == true
                          ? "Delivered"
                          : "Processing"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PastOrders;
