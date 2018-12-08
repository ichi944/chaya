import { connect } from 'react-redux';

import { AuthState } from './interfaces/auth';
import { LoginState } from './interfaces/login';
import { updateLoginForm, authenticate } from './actions';

import Login from './Login';

const mapStateToProps = ({ login, auth }: { login: LoginState; auth: AuthState }) => {
  return {
    email: login.email,
    password: login.password,
    showErrorMessage: login.showErrorMessage,
    errorMessage: login.errorMessage,
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      dispatch(updateLoginForm(e));
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
