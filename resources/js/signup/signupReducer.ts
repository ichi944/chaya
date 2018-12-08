import * as types from './actionTypes';

import { SignupState, SignupActions } from './interfaces/signup';

const initialState = {
  name: '',
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: null,
};

export default (state: SignupState = initialState, action: SignupActions) => {
  switch (action.type) {
    case types.SIGNUP_CHANGE: {
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: null,
      };
    }
    case types.START_SIGNUP: {
      console.log('starting sign up');
      return state;
    }
    case types.SUCCESS_SIGNUP: {
      return {
        ...state,
        name: '',
        email: '',
        password: '',
        showErrorMessage: false,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
};
