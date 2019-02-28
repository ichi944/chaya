import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchProfile } from './actions';
import { RootState } from '../interfaces/rootState';
import { ProfileActions } from './interfaces/profile';

interface Props {
  dispatch: ThunkDispatch<RootState, undefined, ProfileActions>;
}
const LoadProfile: FunctionComponent<Props> = props => {
  useEffect(() => {
    console.log('@LoadProfile: start to fetch user profile.');
    props.dispatch(fetchProfile());
  }, []);
  return <div />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, ProfileActions>) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadProfile);
