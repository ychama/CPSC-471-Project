import "../styles/_app.scss";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { Store } from "./redux/Store";
import AppContext from "./appContext";
import routes from "./RootRoutes";
import AuthGuard from "./auth/AuthGuard";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import MatxLayout from "./MatxLayout/Layout";
import history from "history.js";
import "antd/dist/antd.css";
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [refreshAuth, setRefreshAuth] = useState(false);
  const [authToken, setAuthToken] = useState("");
  return (
    <AppContext.Provider
      value={{
        routes,
        user,
        setUser,
        refreshAuth,
        setRefreshAuth,
        authToken,
        setAuthToken,
        cart,
        setCart,
      }}
    >
      <Provider store={Store}>
        <MatxTheme>
          <Router history={history}>
            <AuthGuard>
              <MatxLayout />
            </AuthGuard>
          </Router>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
