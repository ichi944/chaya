import { connect } from 'react-redux';

import { clearProfile } from './application/actions';
import Initializer from './Initializer';

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestClearProfile() {
      dispatch(clearProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
