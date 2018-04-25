import * as types from './actionTypes';

const initialState = {
  messages: [],
  chatInput: '',
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LATEST_MESSAGES_SUCCEEDED: {
      return {
        ...state,
        messages: action.messages,
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
        messages: [...state.messages, action.chat_message],
      };
    }
    default: {
      return state;
    }
  }
}
