import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import ManagerDashboard from "./ManagerDashboard";
import ManagerProfile from "./ManagerProfile";
import BranchInfo from "../shared/BranchInfo"
import AssessmentIcon from "@material-ui/icons/Assessment";
import InfoIcon from '@material-ui/icons/Info';


const managerRoutes = [
  {
    path: "/managerdashboard",
    component: ManagerDashboard,
    name: "Dashboard",
    home: true,
    sidebarIcon: <AssessmentIcon fontSize="large" />,
  },
  {
    path: "/managerprofile",
    name: "Profile",
    component: ManagerProfile,
    sidebarIcon: <AccountCircle fontSize="large" />,
  },
  {
    path: "/branchinfo",
    name: "Branch Info",
    component: BranchInfo,
    sidebarIcon: <InfoIcon fontSize="large" />,
  }
];

export default managerRoutes;
