import { connect } from 'react-redux';

import SideBar from './SideBar';
import { requestClearActiveChannel } from '../article_lists/actions';
import { ProfileState } from './interfaces/profile';
import { ChannelsState } from '../channel/interfaces/channel';

const mapStateToProps = ({
  router,
  profile,
  channels,
  articleLists,
}: {
  router: any;
  profile: ProfileState;
  channels: ChannelsState;
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
