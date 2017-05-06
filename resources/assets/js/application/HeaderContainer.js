import { connect } from 'react-redux';
import * as authTypes from '../auth/actionTypes';
import { requestSignOut } from '../auth/actions';


import _ from 'lodash';

import Api from '../utils/Api';
import Header from './Header';

const mapStateToProps = ({ auth }) => {
  console.log('in header container');
  console.log(auth);
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignOut() {
      localStorage.removeItem('authToken');
      dispatch(requestSignOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
