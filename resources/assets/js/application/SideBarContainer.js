import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SideBar from './SideBar';

const mapStateToProps = ({ profile, channels }) => {
  return {
    profile,
    channels,
  };
};

export default compose(withRouter, connect(mapStateToProps))(SideBar);
