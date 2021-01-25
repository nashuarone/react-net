const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

// else if zarefactori v switch pozhaluista pozzhe - sebe govoryu

const dialogsReducer = (state_d, action) => {
  if (action.type === SEND_MESSAGE) {
    let newMessage = {
      id: 3,
      message: state_d.newMessageText,
    };
    state_d.messagesData.push(newMessage);
    state_d.newMessageText = "";
  } else if (action.type === UPDATE_MESSAGE_TEXT) {
    state_d.newMessageText = action.message;
  }
  return state_d
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateMessageTextActionCreator = (newMessageUI) => ({
  type: UPDATE_MESSAGE_TEXT,
  message: newMessageUI,
});

export default dialogsReducer;
