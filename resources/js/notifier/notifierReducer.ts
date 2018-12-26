import * as types from './actionTypes';
import { NotifierState, NotifierActions } from './interfaces/notifier';

const initialState = {
  open: false,
  message: '',
};

export default (state: NotifierState = initialState, action: NotifierActions): NotifierState => {
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
};
