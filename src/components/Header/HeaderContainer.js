import React from 'react'
import { connect } from 'react-redux';
import Header from './Header'
import { getUserAuthData } from "../../redux/authReducer";

class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getUserAuthData()
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { getUserAuthData })(HeaderContainer);
