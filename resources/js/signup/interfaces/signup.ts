import { Action } from 'redux';

import * as types from '../actionTypes';

interface SignupChangeAction extends Action {
  type: typeof types.SIGNUP_CHANGE;
  name: string;
  value: string;
}
interface StartSignUpAction extends Action {
  type: typeof types.START_SIGNUP;
}
interface SuccessSignupAction extends Action {
  type: typeof types.SUCCESS_SIGNUP;
}

export type SignupActions = StartSignUpAction | SuccessSignupAction | SignupChangeAction;

export interface SignupState {
  name: string;
  email: string;
  password: string;
  showErrorMessage: boolean;
  errorMessage: string | null;
}
