import { Action } from 'redux';

import * as types from '../actionTypes';

export interface UpdateLoginFormAction extends Action {
  type: typeof types.LOGIN_CHANGE;
  name: string;
  value: string | number;
}

export interface LoginStart extends Action {
  type: typeof types.LOGIN_START;
}
export interface LoginSuccess extends Action {
  type: typeof types.LOGIN_SUCCESS;
}
export interface LoginFailed extends Action {
  type: typeof types.LOGIN_FAILED;
  errorMessage: string;
}

export type LoginActions = UpdateLoginFormAction | LoginStart | LoginSuccess | LoginFailed;

export interface LoginState {
  email: string;
  password: string;
  showErrorMessage: boolean;
  errorMessage: string;
}
