import React from "react";
import { connect } from "react-redux";
import { idinput, pwinput } from "../../Module/login";
import LoginViewFunc from "./LoginViewFunc";
import { bindActionCreators } from "redux";

const LoginContainer = ({ idinput, pwinput }) => {
  return <LoginViewFunc id_input={idinput} pw_input={pwinput} />;
};

export default connect(
  state => ({
    idinput: state.login.id_input,
    pwinput: state.login.pw_input
  }),
  dispatch =>
    bindActionCreators(
      {
        idinput,
        pwinput
      },
      dispatch
    )
)(LoginContainer);
