import * as types from './actionTypes';

const initialState = {
  open: false,
};

export default function notifierReducer(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFY_HELLO: {
      const text = action.text || 'Hello!!';
      const message = `${action.name}: ${text}`;
      return {
        ...state,
        open: true,
        message,
      };
    }
    case types.CLOSE_NOTIFIER: {
      return {
        ...state,
        open: false,
      };
    }
    default: {
      return state;
    }
  }
}
