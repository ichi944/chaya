import { connect } from 'react-redux';
import { requestSignOut } from '../auth/actions';

import Header from './Header';
import { AuthState } from '../auth/interfaces/auth';

const mapStateToProps = ({ auth }: { auth: AuthState }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignOut() {
      localStorage.removeItem('authToken');
      dispatch(requestSignOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
