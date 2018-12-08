import * as React from 'react';
import Echo from 'laravel-echo';
import { ThunkAction } from 'redux-thunk';

import * as types from './actionTypes';
import { LoginActions, LoginState } from './interfaces/login';

import { AuthActions, AuthState } from './interfaces/auth';

import { clearSocketId } from '../application/actions';
import { SocketActions } from '../application/interfaces/socket';

import Api from '../services/Api';

interface Window {
  Echo: any;
  location: any;
}
declare var window: Window;

export const updateLoginForm = (e: React.FormEvent<HTMLInputElement>): LoginActions => {
  return {
    type: types.LOGIN_CHANGE,
    name: e.currentTarget.name,
    value: e.currentTarget.value,
  };
};

export const storeAuthorizationTokenToState = (token: string): AuthActions => {
  return {
    type: types.STORE_AUTHORIZTION_TOKEN_TO_STATE,
    token,
  };
};

export const initializeSocketIOSucceeded = (): AuthActions => {
  return {
    type: types.INITIALIZE_SOCKET_IO_SUCCEEDED,
  };
};

export const requestInitializeSocketIO = (
  token: string,
): ThunkAction<void, AuthState, undefined, AuthActions> => {
  return dispatch => {
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: `${window.location.hostname}:6001`,
      auth: {
        headers: {
          Authorization: `Bearer ${token.toString()}`,
        },
      },
    });
    return dispatch(initializeSocketIOSucceeded());
  };
};

export const startCheckAuthStatus = (): AuthActions => ({ type: types.START_CHECK_AUTH_STATUS });
export const failedAuthentication = (): AuthActions => ({ type: types.FAILED_AUTHENTICATION });
export const endInitialCheckStatus = (): AuthActions => ({ type: types.END_INITIAL_CHECK_STATUS });
export const authenticated = (): AuthActions => ({ type: types.AUTHENTICATED });
export const endCheckAuthStatus = (): AuthActions => ({ type: types.END_CHECK_AUTH_STATUS });

export const handleCheckAuthStatus = (): ThunkAction<void, AuthState, undefined, AuthActions> => {
  return async dispatch => {
    console.log('start check auth status');
    dispatch(startCheckAuthStatus());
    // configure the handler when token expired.
    Api.setInterceptors(
      response => {
        console.log('@interceptor', response);
        if (response.status === 401) {
          console.log('@interceptor: token expired');
          console.log(response);
          dispatch(failedAuthentication());
          dispatch(endInitialCheckStatus());
          // return {
          //   status: 401,
          // };
          return Promise.reject(response);
        }
        return response;
      },
      error => {
        console.log('@interceptor: api gets error.');
        console.log(error);
        return Promise.reject(error);
      },
    );
    console.log('check if the token exists in localStorage');
    const token: string | null = localStorage.getItem('authToken');
    if (!token) {
      console.log('token does not exist');
      dispatch(endInitialCheckStatus());
      dispatch(endCheckAuthStatus());
      return;
    }
    console.log('token exists: ', token);
    dispatch(storeAuthorizationTokenToState(token));

    Api.setAuthorizationToken(token);
    const res = await Api.client.get('/auth/hello');
    console.log('response of hello: ', res.data);
    if (res.data.hasOwnProperty('status') && res.data.status === true) {
      console.log('already authenticated');
      dispatch(requestInitializeSocketIO(token));
      dispatch(authenticated());
    }
    dispatch(endInitialCheckStatus());
  };
};

export const loginStart = (): LoginActions => ({ type: types.LOGIN_START });
export const loginFailed = (error: string): LoginActions => ({
  type: types.LOGIN_FAILED,
  errorMessage: error,
});
export const loginSuccess = (): LoginActions => ({ type: types.LOGIN_SUCCESS });
export const authenticate = (
  email,
  password,
): ThunkAction<void, AuthState | LoginState, undefined, AuthActions | LoginActions> => {
  return dispatch => {
    console.log('start authentication', email);

    dispatch(loginStart());

    Api.client
      .post('/auth/login', {
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          console.log('error');
          dispatch(failedAuthentication());
          dispatch(loginFailed(res.data.error));
          return;
        } // endif: when error
        if (res.data.token) {
          console.log('authenticated');
          const { token } = res.data;

          dispatch(requestInitializeSocketIO(token));
          dispatch(storeAuthorizationTokenToState(token));
          Api.setAuthorizationToken(token);
          localStorage.setItem('authToken', token);
          dispatch(loginSuccess());
          dispatch(authenticated());
        }
      });
  };
};

export const successSignOut = (): AuthActions => ({ type: types.SIGN_OUT });

export const requestSignOut = (): ThunkAction<
  void,
  AuthState,
  undefined,
  AuthActions | SocketActions
> => {
  return dispatch => {
    Api.client.get('/auth/signout').then(() => {
      Api.clearSocketId();
      Api.clearAuthorizationToken();
      dispatch(clearSocketId());
      dispatch(successSignOut());
    });
  };
};
