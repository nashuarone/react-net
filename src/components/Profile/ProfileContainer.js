import React from 'react'
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Profile from './Profile'
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
} from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.currentUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    //if (!this.props.isAuth) return <Redirect to='/login' />
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  currentUserId: state.auth.userId,
});

// let AuthRedirectComponent = (props) => {
//   if (!props.isAuth) return <Redirect to="/login" />;
//   return <ProfileContainer {...props} />
// }

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
