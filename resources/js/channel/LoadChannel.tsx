import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChannel } from './actions';
import { ChannelActions } from './interfaces/channel';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../interfaces/rootState';

interface Props {
  dispatch: ThunkDispatch<RootState, undefined, ChannelActions>;
}
const LoadChannel: FunctionComponent<Props> = props => {
  useEffect(() => {
    props.dispatch(fetchChannel());
  }, []);
  return <div />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, ChannelActions>) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadChannel);
