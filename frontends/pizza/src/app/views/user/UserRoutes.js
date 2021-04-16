import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import Dashboard from "./Dashboard";
import AddToCart from "./AddToCart";
import PastOrders from "./PastOrders";
import Profile from "./Profile";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

const userRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "Dashboard",
    home: true,
    sidebarIcon: <AssessmentIcon fontSize="large" />,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    sidebarIcon: <AccountCircle fontSize="large" />,
  },
  {
    path: "/AddToCart",
    name: "Your Cart",
    component: AddToCart,
    sidebarIcon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    path: "/PastOrder",
    name: "Past Orders",
    component: PastOrders,
    sidebarIcon: <SkipPreviousIcon fontSize="large" />,
  },
];

export default userRoutes;
