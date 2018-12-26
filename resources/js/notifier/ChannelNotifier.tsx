import * as React from 'react';
import { connect } from 'react-redux';

import { channelListUpdated } from './actions';
import { ChannelModel } from '../channel/interfaces/channel';

interface Window {
  Echo: any;
}
declare var window: Window;

interface Props {
  onChannelListUpdated: (channels: ChannelModel[]) => void;
}
class ChannelNotifier extends React.Component<Props> {
  componentDidMount() {
    window.Echo.private('channel').listen('ChannelListUpdated', e => {
      this.props.onChannelListUpdated(e.channels);
    });
  }
  componentWillUnmount() {
    window.Echo.leave('channel');
  }
  render() {
    return null;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelListUpdated(channels: ChannelModel[]) {
      dispatch(channelListUpdated(channels));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelNotifier);
