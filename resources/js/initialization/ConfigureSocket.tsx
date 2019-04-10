import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { configureSocketId } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../interfaces/rootState';
import { SocketActions } from './interfaces/socket';

interface Props {
  configureSocket: () => void;
}
const ConfigureSocket: FunctionComponent<Props> = props => {
  useEffect(() => {
    console.log('@ConfigreSocket');
    props.configureSocket();
  }, []);
  return <div />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, SocketActions>) => ({
  configureSocket() {
    dispatch(configureSocketId());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureSocket);
