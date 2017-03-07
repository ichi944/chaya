import { connect } from 'react-redux';

import Initializer from './Initializer';

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile,
  };
}

export default connect(mapStateToProps)(Initializer);
