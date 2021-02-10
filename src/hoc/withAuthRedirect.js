import React from "react"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  let AuthRedirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    AuthRedirectComponent
  );
  return ConnectedAuthRedirectComponent;
}
