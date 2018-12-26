import * as types from './actionTypes';
import { ChatState, ChatActions } from './interfaces/chat';

const initialState = {
  messages: [],
  chatInput: '',
  show_no_messages_info: false,
};

export default function chatReducer(
  state: ChatState = initialState,
  action: ChatActions,
): ChatState {
  switch (action.type) {
    case types.FETCH_LATEST_MESSAGES_SUCCEEDED: {
      return {
        ...state,
        messages: action.messages,
        show_no_messages_info: action.show_no_messages_info,
      };
    }
    case types.UPDATE_CHAT_INPUT: {
      return {
        ...state,
        chatInput: action.value,
      };
    }
    case types.POST_CHAT_MESSAGE_SUCCEEDED: {
      return {
        ...state,
        chatInput: '',
      };
    }
    case types.ADD_NEW_ARTICLE_CHAT_MESSAGE: {
      return {
        ...state,
        messages: [action.chat_message, ...state.messages],
      };
    }
    case types.FETCH_MESSAGES_SUCCEEDED: {
      return {
        ...state,
        messages: [...state.messages, ...action.chat_messages],
        show_no_messages_info: action.show_no_messages_info,
      };
    }
    case types.NO_MESSAGES_INFO_SHOWN: {
      return {
        ...state,
        show_no_messages_info: true,
      };
    }
    default: {
      return state;
    }
  }
}
