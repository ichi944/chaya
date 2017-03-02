import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleCheckAuthStatus } from './actions';

class InitialCheckStatus extends Component {
  componentDidMount() {
    const { checkAuthStatus } = this.props;
    console.log('in InitialCheckStatus: start initial auth check');
    checkAuthStatus();
  }
  render() {
    return (
      <div>initial</div>
    );
  }
}

const mapStateToProps = (auth) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus() {
      dispatch(handleCheckAuthStatus());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialCheckStatus);
