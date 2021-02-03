import React from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as axios from 'axios'
import Profile from './Profile'
import { setUserProfile } from '../../redux/profileReducer'

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 14629
    }
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/` + userId
      )
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
  })

let ContainerWithUserData = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(ContainerWithUserData);
