import * as React from 'react';
import { connect } from 'react-redux';

import { configureSocketId } from './actions';

interface Props {
  configureSocket: () => void;
}
class ConfigureSocket extends React.Component<Props> {
  componentDidMount() {
    console.log('@ConfigreSocket');
    this.props.configureSocket();
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    configureSocket() {
      dispatch(configureSocketId());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureSocket);
