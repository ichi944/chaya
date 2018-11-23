import * as React from 'react';
import { connect } from 'react-redux';

import { fetchChannel } from './actions';

class LoadChannel extends React.Component {
  componentDidMount() {
    const { loadChannel } = this.props;
    console.log('in LoadChannel, start to fetch channel');
    loadChannel();
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadChannel() {
      dispatch(fetchChannel());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadChannel);
