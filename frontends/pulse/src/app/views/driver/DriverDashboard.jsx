import React, { useEffect, useState, useContext, useRef } from "react";
import PizzaLogo from "../../MatxLayout/SharedCompoents/PizzaMainLogo";
import classnames from "classnames";
import AppContext from "../../appContext";
import { makeStyles, Grid, Container, CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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

const DriverDashboard = () => {
  const { user, authToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const classCard = useStylesCard();
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  const getOrders = async () => {
    axios
      .get("http://localhost:8000/restapi/order/driver/" + user.username + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
  };

  const deliverOrder = (orderDate, customer) => {
    axios
      .put("http://localhost:8000/restapi/order/driver/" + user.username + "/", {
        order_date: orderDate,
        customer: customer,
      })
      .then((res) => {
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const displayDate = (orderDate) => {
    let date = new Date(orderDate);
    return date.toUTCString();
  }

  const getCustomerAddress = (customer) => {
    return " " + customer["user"]["house_num"] 
            + " " 
            + customer["user"]["street_num"] 
            + ", " 
            + customer["user"]["postal_code"];
  }

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
          {orders.map((element) => (
            <Grid item xs={6} key={orders.indexOf(element)}>
              <Card className={classCard.root}>
                <CardHeader title={displayDate(element["order_date"])} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Food Items:   
                    {element["food_items"].map((item, key) => {
                      return " " + item["name"] + ",";
                    })} 
                    <br></br>
                    To: 
                    {getCustomerAddress(element["customer"])}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      deliverOrder(element["order_date"], element["customer"]["user"]["username"]);
                    }}
                    size="small"
                    color="primary"
                  >
                    Deliver Order
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <h3>
          {orders.length ? " " : "No Orders To Deliver"}
        </h3>
      </Container>
    </div>
  );
};

export default DriverDashboard;
