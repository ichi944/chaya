import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SideBar from './SideBar';
import { requestClearActiveChannel } from '../article_lists/actions';

const mapStateToProps = ({
  router, profile, channels, articleLists,
}) => {
  return {
    router,
    profile,
    channels,
    articleLists,
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
