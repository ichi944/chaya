import { connect } from 'react-redux';

import _ from 'lodash';

import Api from '../utils/Api';
import Home from './Home';

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(mapStateToProps)(Home);
