import { connect } from 'react-redux';

import * as types from './actionTypes';

import VerifyUser from './VerifyUser';
import { requestVerifyUser } from './actions';

const mapStateToProps = ({ verifyUser }) => {
  console.log('@verifyUser map state', verifyUser);
  return {
    verifyUser,
  }
};

const mapDispatchToProps =(dispatch) => {
  return {
    handleVerifyUser(token) {
      dispatch(requestVerifyUser(token));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
