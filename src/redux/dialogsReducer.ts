import { DialogType, MessageType } from "../types/types";
// refactoring v switch - done

const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogsData: [
    { id: 1, name: "Pupsik" },
    { id: 2, name: "Baby" },
    { id: 3, name: "Alyosha" },
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, message: "Hi, edreniy!" },
    { id: 2, message: "How are you???" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state_d = initialState, action: any) => {
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

type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE
  newDialogMessage: string
};
export const sendMessageActionCreator = (
  newDialogMessage: string
): SendMessageActionCreatorType => ({
  type: SEND_MESSAGE,
  newDialogMessage,
});

export default dialogsReducer;
