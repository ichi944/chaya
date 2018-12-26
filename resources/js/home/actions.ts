import { ThunkAction } from 'redux-thunk';
import Api from '../services/Api';
import * as types from './actionTypes';
import { HomeActions } from './interfaces/home';
import { RootState } from '../interfaces/rootState';
import { AxiosResponse } from 'axios';

export const sayHelloSucceeded = (): HomeActions => ({ type: types.SAY_HELLO_SUCCEEDED });

export const sayHello = (
  text: string,
): ThunkAction<void, RootState, undefined, HomeActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.post('/say-hello', { text });
  console.log(res);
  dispatch(sayHelloSucceeded());
};
