import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from './actions';

class LoadProfile extends Component {
  componentDidMount() {
    const { loadProfile } = this.props;
    console.log('in LoadProfile, start to fetch user profile.');
    loadProfile();
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
    loadProfile() {
      dispatch(fetchProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadProfile);
