import * as React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from './actions';

interface Props {
  loadProfile: () => void;
}
class LoadProfile extends React.Component<Props> {
  componentDidMount() {
    const { loadProfile } = this.props;
    console.log('in LoadProfile, start to fetch user profile.');
    loadProfile();
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    loadProfile() {
      dispatch(fetchProfile());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadProfile);
