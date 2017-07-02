import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SideBar from './SideBar';

const mapStateToProps = ({ profile, channels, articleChannel }) => {
  return {
    profile,
    channels,
    articleChannel,
  };
};

export default compose(withRouter, connect(mapStateToProps))(SideBar);
