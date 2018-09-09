import { connect } from 'react-redux';

import * as types from './actionTypes';
import { authenticate } from './actions';

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
      dispatch(authenticate(email, password));
    },
    handlePressEnter(e, email, password) {
      if (e.key === 'Enter') {
        dispatch(authenticate(email, password));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
