import * as types from './actionTypes';
import Api from '../utils/Api';

export function fetchArticles() {
  return function (dispatch) {
    dispatch({
      type: types.START_FETCH_ARTICLES,
    });

    Api.client.get('/articles')
      .then((res) => {
        dispatch({
          type: types.END_FETCH_ARTICLES,
          data: res.data,
        });
      }); // Api
  };
}

export function fetchArticleById(id) {
  return function (dispatch) {
    dispatch({
      type: types.START_FETCH_ARTICLE,
    });

    Api.client.get(`/articles/${id}`)
      .then((res) => {
        console.log('got article');
        dispatch({
          type: types.END_FETCH_ARTICLE,
          data: res.data,
        });
      }); // Api
  };
}

export function updateArticleAddForm(name, value) {
  return {
    type: types.UPDATE_ARTICLE_ADD_FORM,
    name,
    value,
  };
}
