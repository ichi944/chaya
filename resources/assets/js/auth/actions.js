import _ from 'lodash';

import * as applicationTypes from '../application/actionTypes';
import * as types from './actionTypes';

import Api from '../utils/Api';

export function handleCheckAuthStatus() {
  return function (dispatch) {
    console.log('start check auth status');
    dispatch({
      type: types.START_CHECK_AUTH_STATUS,
    });
    console.log('check if the token exists in localStorage');
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('token exists: ', token);
      Api.setAuthorizationToken(token);
      Api.client.get('/auth/hello')
        .then((res) => {
          console.log('response of hello: ', res.data);
          if (_.has(res.data, 'user')) {
            console.log('already authenticated');
            dispatch({
              type: types.AUTHENTICATED,
            });
            dispatch({
              type: applicationTypes.LORDED_PROFILE,
              profile: res.data,
            });
            dispatch({
              type: types.END_INITIAL_CHECK_STATUS,
            });
          } else {
            console.log('not authenticated');
            dispatch({
              type: types.FAILED_AUTHENTICATION,
            });
            dispatch({
              type: types.END_CHECK_AUTH_STATUS,
            });
            dispatch({
              type: types.END_INITIAL_CHECK_STATUS,
            });
          }
        });
    } else {
      dispatch({
        type: types.END_INITIAL_CHECK_STATUS,
      });
      dispatch({
        type: types.END_CHECK_AUTH_STATUS,
      });
    }
  };
}

export function authenticate(email, password) {
  return function (dispatch) {
    console.log('on handleAuthenticate');
    console.log(email, password);

    dispatch({
      type: types.LOGIN_START,
    });

    Api.client.post('/auth/login', {
      email,
      password,
    })
    .then((res) => {
      console.log(res.data);
      if (_.has(res.data, 'error')) {
        console.log('error');
        dispatch({
          type: types.FAILED_AUTHENTICATION,
        });
        dispatch({
          type: types.LOGIN_FAILED,
          errorMessage: res.data.error,
        });
        return;
      } // endif: when error
      if (_.has(res.data, 'token')) {
        console.log('authenticated');
        localStorage.setItem('authToken', res.data.token);
        dispatch({
          type: types.LOGIN_SUCCESS,
        });
        dispatch({
          type: types.AUTHENTICATED,
        });
        dispatch({
          type: applicationTypes.LORDED_PROFILE,
          profile: res.data,
        });
      }
    });
  };
}
