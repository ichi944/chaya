import * as types from './actionTypes';
import Api from '../utils/Api';

export function fetchArticles() {
  return function (dispatch) {
    dispatch({
      type: types.START_FETCH_ARTICLES,
    });

    const token = localStorage.getItem('authToken');

    if (token) {
      Api.setAuthorizationToken(token);
      Api.client.get('/articles')
        .then((res) => {
          dispatch({
            type: types.END_FETCH_ARTICLES,
            data: res.data,
          });
        }); // Api
    } // if (token)
  };
}
