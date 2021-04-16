import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = (state) => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login,
});

export default connect(mapStateToProps, { setUserData })(Auth);
