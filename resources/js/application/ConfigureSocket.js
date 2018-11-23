import * as React from 'react';
import { connect } from 'react-redux';

import { configureSocketId } from './actions';

class ConfigureSocket extends React.Component {
  componentDidMount() {
    console.log('@ConfigreSocket');
    this.props.configureSocket();
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
    configureSocket() {
      dispatch(configureSocketId());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureSocket);
