import { connect } from 'react-redux';

import { clearProfile } from './application/actions';
import Initializer from './Initializer';

const mapStateToProps = ({ auth, profile, channels }) => {
  return {
    auth,
    profile,
    channels,
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
