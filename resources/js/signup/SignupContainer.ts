import { connect } from 'react-redux';

import { signupChange, requestSignup } from './actions';
import { SignupState } from './interfaces/signup';
import { AuthState } from '../auth/interfaces/auth';

import Signup from './Signup';

const mapStateToProps = ({ signup, auth }: { signup: SignupState; auth: AuthState }) => {
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

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch(signupChange(name, value));
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
