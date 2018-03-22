import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SideBar from './SideBar';
import { requestClearActiveChannel } from '../articles/actions';

const mapStateToProps = ({
  router, profile, channels, articleChannel,
}) => {
  return {
    router,
    profile,
    channels,
    articleChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearActiveChannel() {
      dispatch(requestClearActiveChannel());
    },
  };
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SideBar);
