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

const AddToCart = () => {
  const { user, authToken } = useContext(AppContext);
  const [cartList, setCartList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [branchID, setBranchID] = useState(-1);
  const [branchAddress, setBranchAddress] = useState("");
  const classButton = useStylesButton();
  const classCard = useStylesCard();
  const classes = useStyles();

  let total = 0.0;

  const removeFromCart = (foodName) => {
    let tempCartList = [...cartList];
    let index = tempCartList.indexOf(foodName);
    if (index > -1) {
      tempCartList.splice(index, 1);
    }
    console.log(tempCartList);
    localStorage.setItem("cartSelection", tempCartList);
    setCartList(tempCartList);
  };

  const checkoutCart = () => {
    if (cartList.length === 0 || cartList[0] === "") {
      alert("Nothing to order, hit the dashboard for some great selections");
      return;
    }

    axios
      .post(
        "http://localhost:8000/restapi/order/",
        {
          branch: branchID,
          food_items: cartList,
          customer: user.username,
        },
        { headers: { Authorization: "Bearer " + authToken } }
      )
      .then((res) => {
        console.log(res);
        setCartList([]);
        localStorage.setItem("cartSelection", []);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 503)
          alert(
            "There are no Drivers Available To complete your order, Please try a different branch or try again later"
          );
      });
  };
  const getBranchAddress = () => {
    axios
      .get("http://localhost:8000/restapi/branch/" + branchID + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        let branchAddress =
          res.data["house_num"] +
          " " +
          res.data["street_num"] +
          ", " +
          res.data["postal_code"];

        setBranchAddress(branchAddress);
      });
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      let tempCartList = localStorage.getItem("cartSelection");
      setCartList(tempCartList.split(","));
      console.log(cartList.length);
      setBranchID(localStorage.getItem("branchSelection"));
    }
  }, [user]);

  useEffect(() => {
    if (branchID !== -1) {
      getFoods();
      getBranchAddress();
    }
  }, [branchID]);

  const getFoods = () => {
    axios
      .get("http://localhost:8000/restapi/foods/" + branchID + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        setFoodList(res.data);
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
            <Button
              onClick={() => checkoutCart()}
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
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
          {cartList.map((element) => {
            let index = -1;
            for (let i = 0; i < foodList.length; i++) {
              if (foodList[i]["name"] === element) {
                index = i;
                break;
              }
            }
            if (index === -1) return;
            let foodInfo = foodList[index];
            total += foodInfo["price"];
            console.log(total);

            return (
              <Grid item xs={6} key={cartList.indexOf(element)}>
                <Card className={classCard.root}>
                  <CardHeader title={element} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Price : ${foodInfo["price"]} <br></br> Ingredients:
                      {foodInfo["food_uses"].map((foodUses, key) => {
                        return foodUses["ingredient"]["name"] + ", ";
                      })}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        removeFromCart(element);
                      }}
                      size="small"
                      color="primary"
                    >
                      Remove From Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <h3>
          {" "}
          {cartList.length > 0 && cartList[0] !== ""
            ? "Total: " + "$" + total + " from Branch " + branchAddress
            : "Nothing has been added to the cart"}
        </h3>
      </Container>
    </div>
  );
};

export default AddToCart;
