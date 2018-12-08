import * as types from './actionTypes';

import { SocketState, SocketActions } from './interfaces/socket';

const initialState = {
  hasSocketId: false,
};

export default (state: SocketState = initialState, action: SocketActions) => {
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
};
