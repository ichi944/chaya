import { connect } from 'react-redux';

import _ from 'lodash';

import * as types from './actionTypes';

import Api from '../utils/Api';
import Login from './Login';

const mapStateToProps = ({ login, auth }) => {
  console.log('on mapStateToProps', login, auth);
  return {
    email: login.email,
    password: login.password,
    showErrorMessage: login.showErrorMessage,
    errorMessage: login.errorMessage,
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('on mapDispatchToProps');
  console.log(ownProps);
  return {
    handleChange: (e) => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch({
        type: types.LOGIN_CHANGE,
        name,
        value,
      });
    },
    handleAuthenticate(email, password) {
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
            type: types.AUTHENTICATE_FAILED,
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
        }
      });
    },
    handleCheckAuthStatus() {
      console.log('start check auth status');
      dispatch({
        type: types.START_CHECK_AUTH_STATUS,
      });
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
            } else {
              console.log('not authenticated');
              dispatch({
                type: types.FAILED_AHTENTICATION,
              });
              dispatch({
                type: types.END_CHECK_AUTH_STATUS,
              });
            }
          });
      } else {
        dispatch({
          type: types.END_CHECK_AUTH_STATUS,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
