import { Action } from 'redux';

import * as types from '../actionTypes';

export interface StoreAuthorizationTokenToStateAction extends Action {
  type: typeof types.STORE_AUTHORIZTION_TOKEN_TO_STATE;
  token: string;
}

export interface InitializeSocketIOSucceeded extends Action {
  type: typeof types.INITIALIZE_SOCKET_IO_SUCCEEDED;
}

export interface StartAuthCheckStatus extends Action {
  type: typeof types.START_CHECK_AUTH_STATUS;
}

export interface FailedAuthentication extends Action {
  type: typeof types.FAILED_AUTHENTICATION;
}

export interface EndInitialCheckStatus extends Action {
  type: typeof types.END_INITIAL_CHECK_STATUS;
}

export interface Authenticated extends Action {
  type: typeof types.AUTHENTICATED;
}

export interface EndCheckAuthStatus extends Action {
  type: typeof types.END_CHECK_AUTH_STATUS;
}

export interface SignOut extends Action {
  type: typeof types.SIGN_OUT;
}

export type AuthActions =
  | StoreAuthorizationTokenToStateAction
  | InitializeSocketIOSucceeded
  | StartAuthCheckStatus
  | FailedAuthentication
  | EndInitialCheckStatus
  | Authenticated
  | EndCheckAuthStatus
  | SignOut;

export interface AuthState {
  isDoneCheckingStatusAtInitialize: boolean;
  isAuthenticated: boolean;
  authorizationToken: string | null;
}
