import { connect } from 'react-redux';

import Login from './Login';

const mapStateToProps = (state) => {
  console.log('on mapStateToProps', state);
  return {
    email: state.email,
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch) => {
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
    handleAuthenticate: () => {
      dispatch({
        type: 'LOGIN_START',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
