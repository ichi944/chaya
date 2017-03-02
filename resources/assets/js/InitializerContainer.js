import { connect } from 'react-redux';

import Initializer from './Initializer';

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Initializer);
