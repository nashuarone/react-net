import { compose } from "redux";
import { connect } from "react-redux";
import { sendMessageActionCreator } from "../../redux/dialogsReducer";
import Dialogs from './Dialogs'
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newDialogMessage) => {
      dispatch(sendMessageActionCreator(newDialogMessage));
    },
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthRedirect
)(Dialogs);
