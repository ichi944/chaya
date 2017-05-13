import { connect } from 'react-redux';

import Home from './Home';

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(mapStateToProps)(Home);
