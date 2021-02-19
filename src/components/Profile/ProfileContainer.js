import React from 'react'
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Profile from './Profile'
import { getUserProfile, getUserStatus, updateUserStatus } from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 14629
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId)
  }

  render() {
    //if (!this.props.isAuth) return <Redirect to='/login' />
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
  })

// let AuthRedirectComponent = (props) => {
//   if (!props.isAuth) return <Redirect to="/login" />;
//   return <ProfileContainer {...props} />
// }

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
