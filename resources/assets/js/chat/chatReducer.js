import * as types from './actionTypes';

const initialState = {
  chatInput: '',
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CHAT_INPUT: {
      return {
        ...state,
        chatInput: action.value,
      };
    }
    default: {
      return state;
    }
  }
}
