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

const Dashboard = () => {
  const { user, authToken } = useContext(AppContext);
  const [branchList, setBranchList] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [branchSelection, setBranchSelection] = useState(-1);
  const anchorRef = useRef(null);
  const classButton = useStylesButton();
  const classCard = useStylesCard();
  const classes = useStyles();
  const addToCart = (foodName) => {
    const tempCart = [...cart];
    tempCart.push(foodName);

    setCart(tempCart);
  };

  useEffect(() => {
    localStorage.setItem("cartSelection", cart);
  }, [cart]);

  const elementExists = (foodName) => {
    let temp = cart.indexOf(foodName);

    if (temp < 0) return false;
    else return true;
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const getBranchAddress = (branchID) => {
    let branchAddress = "";

    for (let i = 0; i < branchList.length; i++) {
      if (branchList[i]["branch_id"] === branchID) {
        branchAddress +=
          branchList[i]["house_num"] +
          " " +
          branchList[i]["street_num"] +
          ", " +
          branchList[i]["postal_code"];
        return branchAddress;
      }
    }
    return "N/A";
  };

  const handleClose = (branchId) => {
    if (branchId != branchSelection) setCart([]);
    setBranchSelection(branchId);
    localStorage.setItem("branchSelection", branchId);

    axios
      .get("http://localhost:8000/restapi/foods/" + branchId + "/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        setFoodItems(res.data);
      });

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (user) {
      //get branches
      getBranches();
    }
  }, [user]);

  const getBranches = async () => {
    axios
      .get("http://localhost:8000/restapi/branch/", {
        headers: { Authorization: "Bearer " + authToken },
      })
      .then((res) => {
        setBranchSelection(res.data[0].branch_id);
        setBranchList(res.data);
        handleClose(res.data[0].branch_id);
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

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        {branchList.map((branch, key) => {
                          return (
                            <MenuItem
                              onClick={() => {
                                handleClose(branch.branch_id);
                              }}
                            >
                              {getBranchAddress(branch.branch_id)}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          variant="contained"
          color="primary"
        >
          Branch List Selection
        </Button>
        <Grid
          item
          container
          direction="row"
          spacing={2}
          justify="center"
          alignItems="flex-start"
          xs={12}
          className={classnames(classes.gridCell, classes.gridRowTwo)}
        >
          {foodItems.map((element) => (
            <Grid item xs={6} key={foodItems.indexOf(element)}>
              <Card className={classCard.root}>
                <CardMedia
                  className={classCard.media}
                  image="/assets/images/Pizza.jpg"
                  title="Contemplative Reptile"
                />
                <CardHeader title={element["name"]} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Price : ${element["price"]} <br></br> Ingredients:
                    {element["food_uses"].map((foodUses, key) => {
                      return foodUses["ingredient"]["name"] + ", ";
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    disabled={elementExists(element["name"])}
                    onClick={() => {
                      addToCart(element["name"]);
                    }}
                    size="small"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <h3> Selected Branch: {getBranchAddress(branchSelection)}</h3>
      </Container>
    </div>
  );
};

export default Dashboard;
