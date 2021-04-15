import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import userRoutes from "./views/user/UserRoutes";
import driverRoutes from "./views/driver/DriverRoutes";
import managerRoutes from "./views/manager/ManagerRoutes";

function RedirectComponent() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {}, []);
  return authenticated ? (
    <Redirect to="/" />
  ) : (
    <Redirect to="/session/signin" />
  );
}

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: RedirectComponent,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionRoutes,
  ...driverRoutes,
  ...managerRoutes,
  ...userRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
