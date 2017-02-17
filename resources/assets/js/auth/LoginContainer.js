import { connect } from 'react-redux';

import _ from 'lodash';

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
        type: 'LOGIN_CHANGE',
        name,
        value,
      });
    },
    handleAuthenticate(email, password) {
      console.log('on handleAuthenticate');
      console.log(email, password);

      dispatch({
        type: 'LOGIN_START',
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
            type: 'AUTHENTICATE_FAILED',
          });
          dispatch({
            type: 'LOGIN_FAILED',
            errorMessage: res.data.error,
          });
          return;
        } // endif: when error
        if (_.has(res.data, 'token')) {
          console.log('authenticated');
          dispatch({
            type: 'LOGIN_SUCCESS',
          });
          dispatch({
            type: 'AUTHENTICATED',
            token: res.data.token,
          });
        }
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
