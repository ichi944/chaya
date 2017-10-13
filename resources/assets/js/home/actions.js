import Api from '../services/Api';
import * as types from './actionTypes';

export function sayHelloSucceeded() {
  return {
    type: types.SAY_HELLO_SUCCEEDED,
  };
}

export function sayHello() {
  return (dispatch) => {
    Api.client.get('/say-hello').then((res) => {
      console.log(res);
      dispatch(sayHelloSucceeded());
    });
  };
}
