import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import Dashboard from "../user/Dashboard";

import Profile from "../user/Profile";
import AssessmentIcon from "@material-ui/icons/Assessment";


const managerRoutes = [
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
  }
];

export default managerRoutes;
