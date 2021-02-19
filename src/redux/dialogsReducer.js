const SEND_MESSAGE = "SEND-MESSAGE";
// refactoring v switch - done

let initialState = {
  dialogsData: [
    { id: 1, name: "Pupsik" },
    { id: 2, name: "Baby" },
    { id: 3, name: "Alyosha" },
  ],
  messagesData: [
    { id: 1, message: "Hi, edreniy!" },
    { id: 2, message: "How are you???" },
  ]
};

const dialogsReducer = (state_d = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: 3,
        message: action.newDialogMessage,
      };
      return {
        ...state_d,
        messagesData: [...state_d.messagesData, newMessage],
      };
    default:
      return state_d
  }
}

export const sendMessageActionCreator = (newDialogMessage) => ({
  type: SEND_MESSAGE,
  newDialogMessage,
});

export default dialogsReducer;
