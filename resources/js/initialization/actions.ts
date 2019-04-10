import { ThunkAction } from 'redux-thunk';
import { RootState } from '../interfaces/rootState';
import { SocketActions } from './interfaces/socket';
import * as types from './actionTypes';
import Api from '../services/Api';

interface Window {
  Echo: any;
  location: any;
}
declare var window: Window;

export const doneSetSocketId = (): SocketActions => ({ type: types.DONE_SET_SOCKET_ID });

export const clearSocketId = (): SocketActions => ({ type: types.CLEAR_SOCKET_ID });

export const configureSocketId = (): ThunkAction<
  void,
  RootState,
  undefined,
  SocketActions
> => dispatch => {
  const socketId = window.Echo.socketId();
  console.log('@getting socketId: ', socketId);
  Api.setSocketId(socketId);
  dispatch(doneSetSocketId());
};
