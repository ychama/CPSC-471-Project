import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import DriverDashboard from "./DriverDashboard";
import DriverSchedule from "./DriverSchedule";
import DriverProfile from "./DriverProfile";
import BranchInfo from "../shared/BranchInfo"
import AssessmentIcon from "@material-ui/icons/Assessment";
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoIcon from '@material-ui/icons/Info';


const driverRoutes = [
  {
    path: "/driverdashboard",
    component: DriverDashboard,
    name: "Dashboard",
    home: true,
    sidebarIcon: <AssessmentIcon fontSize="large" />,
  },
  {
    path: "/driverprofile",
    name: "Profile",
    component: DriverProfile,
    sidebarIcon: <AccountCircle fontSize="large" />,
  },
  {
    path: "/driverschedule",
    name: "Schedule",
    component: DriverSchedule,
    sidebarIcon: <ScheduleIcon fontSize="large" />,
  },
  {
    path: "/branchinfo",
    name: "Branch Info",
    component: BranchInfo,
    sidebarIcon: <InfoIcon fontSize="large" />,
  }
];

export default driverRoutes;
