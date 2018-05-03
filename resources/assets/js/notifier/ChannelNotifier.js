import React, { Component } from 'react';
import { connect } from 'react-redux';

import { channelListUpdated } from './actions';

class ChannelNotifier extends Component {
  componentDidMount() {
    window.Echo.private('channel').listen('ChannelListUpdated', (e) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelListUpdated(channels) {
      dispatch(channelListUpdated(channels));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNotifier);
