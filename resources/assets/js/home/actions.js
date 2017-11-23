import Api from '../services/Api';
import * as types from './actionTypes';

export function sayHelloSucceeded() {
  return {
    type: types.SAY_HELLO_SUCCEEDED,
  };
}

export function sayHello(text) {
  return (dispatch) => {
    Api.client.post('/say-hello', { text }).then((res) => {
      console.log(res);
      dispatch(sayHelloSucceeded());
    });
  };
}
