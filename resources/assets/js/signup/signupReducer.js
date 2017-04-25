// @flow
import * as types from './actionTypes';

type SignupState = {
  +name: string,
  +email: string,
  +password: string,
  +showErrorMessage: boolean,
  +errorMessage: string,
}

const initialState = {
  name: '',
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function signupReducer(state: SignupState = initialState, action: any) {
  switch (action.type) {
    case types.SIGNUP_CHANGE: {
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    default: {
      return state;
    }
  }
}
