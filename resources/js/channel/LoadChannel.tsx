import * as React from 'react';
import { connect } from 'react-redux';

import { fetchChannel } from './actions';

interface Props {
  loadChannel: () => void;
}
class LoadChannel extends React.Component<Props> {
  componentDidMount() {
    const { loadChannel } = this.props;
    loadChannel();
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loadChannel() {
      dispatch(fetchChannel());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadChannel);
