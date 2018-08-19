import * as types from './actionTypes';

const initialState = {
  hasSocketId: false,
};

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case types.DONE_SET_SOCKET_ID: {
      return {
        ...state,
        hasSocketId: true,
      };
    }
    case types.CLEAR_SOCKET_ID: {
      return {
        ...state,
        hasSocketId: false,
      };
    }
    default: {
      return state;
    }
  }
}
