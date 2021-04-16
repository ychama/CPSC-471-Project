import React, { Component } from "react";
import MatxLayouts from "./index";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { connect } from "react-redux";
import AppContext from "../appContext";
import {
  setLayoutSettings,
  setDefaultSettings,
} from "../redux/actions/LayoutActions";
import { isEqual, merge } from "lodash";
import { isMdScreen, getQueryParam } from "utils";

class Layout extends Component {
  constructor(props, context) {
    super(props);
    this.appContext = context;
    this.updateSettingsFromRouter();
    this.setLayoutFromQuery();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateSettingsFromRouter();
    }
  }

  componentDidMount() {
    if (window) {
      window.addEventListener("resize", this.listenWindowResize);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.listenWindowResize);
    }
  }

  setLayoutFromQuery = () => {
    try {
      let settingsFromQuery = getQueryParam("settings");
      settingsFromQuery = settingsFromQuery
        ? JSON.parse(settingsFromQuery)
        : {};
      let { settings, setLayoutSettings, setDefaultSettings } = this.props;
      let updatedSettings = merge({}, settings, settingsFromQuery);

      setLayoutSettings(updatedSettings);
      setDefaultSettings(updatedSettings);
    } catch (e) {}
  };

  listenWindowResize = () => {
    let { settings, setLayoutSettings } = this.props;

    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen() ? "close" : "full";
      setLayoutSettings(
        merge({}, settings, { layout1Settings: { leftSidebar: { mode } } })
      );
    }
  };

  updateSettingsFromRouter() {
    const { routes } = this.appContext;
    const matched = matchRoutes(routes, this.props.location.pathname)[0];
    let { defaultSettings, settings, setLayoutSettings } = this.props;

    if (matched && matched.route.settings) {
      const updatedSettings = merge({}, settings, matched.route.settings);
      if (!isEqual(settings, updatedSettings)) {
        setLayoutSettings(updatedSettings);
      }
    } else if (!isEqual(settings, defaultSettings)) {
      setLayoutSettings(defaultSettings);
    }
  }

  render() {
    const { settings } = this.props;
    const Layout = MatxLayouts[settings.activeLayout];

    return <Layout {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
  defaultSettings: state.layout.defaultSettings,
});

Layout.contextType = AppContext;

export default withRouter(
  connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(Layout)
);
