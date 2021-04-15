import React from "react";
import {
  CalendarToday,
  AccountCircle,
  ChildFriendly,
} from "@material-ui/icons";
import DriverDashboard from "./DriverDashboard";
import DriverSchedule from "./DriverSchedule";
import DriverProfile from "./DriverProfile";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ScheduleIcon from '@material-ui/icons/Schedule';


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
  }
];

export default driverRoutes;
