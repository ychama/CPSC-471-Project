import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import Dashboard from "./Dashboard";
import AssessmentIcon from "@material-ui/icons/Assessment";

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
    component: null,
    sidebarIcon: <AccountCircle fontSize="large" />,
  },
];

export default userRoutes;
