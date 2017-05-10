import { connect } from 'react-redux';

import * as types from './actionTypes';
import { requestSignup } from './actions';

import Signup from './Signup';

const mapStateToProps = ({ signup, auth }) => {
  console.log('on mapStateToProps', signup, auth);
  return {
    name: signup.name,
    email: signup.email,
    password: signup.password,
    showErrorMessage: signup.showErrorMessage,
    errorMessage: signup.errorMessage,
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch({
        type: types.SIGNUP_CHANGE,
        name,
        value,
      });
    },
    handleSubmit(name, email, password) {
      dispatch(requestSignup(name, email, password));
    },
    handlePressEnter(e, name, email, password) {
      if (e.key === 'Enter') {
        dispatch(requestSignup(name, email, password));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
