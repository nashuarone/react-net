import { compose } from "redux";
import { connect } from "react-redux";
import { sendMessageActionCreator } from "../../redux/dialogsReducer";
import Dialogs from './Dialogs'
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { DialogType, MessageType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
  dialogsData: Array<DialogType>;
  messagesData: Array<MessageType>;
  isAuth: boolean;
};
type MapDispatchPropsType = {
  sendMessage: (newDialogMessage: string) => void;
};
type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType) => {
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
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthRedirect
)(Dialogs);
