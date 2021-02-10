import React from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Profile from './Profile'
import { getUserProfile } from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 14629
    }
    this.props.getUserProfile(userId);
  }

  render() {
    //if (!this.props.isAuth) return <Redirect to='/login' />
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
  })

// let AuthRedirectComponent = (props) => {
//   if (!props.isAuth) return <Redirect to="/login" />;
//   return <ProfileContainer {...props} />
// }

// часть стейта с isAuth вынесли в самодельный HOC withAuthRedirect и передали в ещё один connect внутри Хока

let withRedirect = withAuthRedirect(ProfileContainer); //можно просто обернуть весь connect в withAuthRedirect

let ContainerWithUserData = withRouter(withRedirect); //при этом не забыть уже сюда засунуть ProfileContainer

export default connect(mapStateToProps, { getUserProfile })(
  ContainerWithUserData
);
