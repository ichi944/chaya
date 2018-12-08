import { connect } from 'react-redux';

import SideBar from './SideBar';
import { requestClearActiveChannel } from '../article_lists/actions';
import { ProfileState } from './interfaces/profile';

const mapStateToProps = ({
  router,
  profile,
  channels,
  articleLists,
}: {
  router: any;
  profile: ProfileState;
  channels: any;
  articleLists: any;
}) => {
  return {
    router,
    profile,
    channels,
    articleLists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearActiveChannel() {
      dispatch(requestClearActiveChannel());
    },
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
