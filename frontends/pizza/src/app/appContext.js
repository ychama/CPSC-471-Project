import React from "react";

const AppContext = React.createContext({
  routes: [],
  user: null,
  token: "",
  setUser: () => {},
});

export default AppContext;
