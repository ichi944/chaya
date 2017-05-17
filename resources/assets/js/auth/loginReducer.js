// @flow
import * as types from './actionTypes';

type LoginState = {
  +email: string,
  +password: string,
  +showErrorMessage: boolean,
  +errorMessage: string,
};

const initialState = {
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function loginReducer(state: LoginState = initialState, action: any) {
  switch (action.type) {
    case types.LOGIN_CHANGE: {
      console.log('LOGIN_CHANGE', action);
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.LOGIN_START: {
      console.log('try to login: ', state.email);
      return state;
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        email: '',
        password: '',
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.LOGIN_FAILED: {
      return {
        ...state,
        password: '',
        showErrorMessage: true,
        errorMessage: action.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
}
