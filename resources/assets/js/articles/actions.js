import { push } from 'react-router-redux';

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

export function togglePreviewMode() {
  return {
    type: types.TOGGLE_PREVIEW_MODE,
  };
}

export function clearArticleAdd() {
  return {
    type: types.CLEAR_ARTICLE_ADD,
  };
}

export function successCreateArticle() {
  return {
    type: types.SUCCESS_CREATE_ARTICLE,
  };
}
export function createNewArticle(data) {
  return function (dispatch) {
    Api.client.post('/articles/', data)
      .then((res) => {
        console.log(res.data);

        dispatch(successCreateArticle());
      });
  };
}

export function closeConfirmSuccessDialog() {
  return {
    type: types.CLOSE_CONFIRM_SUCCESS_DIALOG,
  };
}

export function confirmedSuccessCreating() {
  return function (dispatch) {
    dispatch(clearArticleAdd());
    dispatch(closeConfirmSuccessDialog());
    dispatch(push('/app/articles'));
  };
}

export function updateArticleEditForm(name, value) {
  return {
    type: types.UPDATE_ARTICLE_EDIT_FORM,
    name,
    value,
  };
}

export function togglePreviewModeOnEditForm() {
  return {
    type: types.TOGGLE_PREVIEW_MODE_ON_EDIT_FORM,
  };
}

export function clearArticleEdit() {
  return {
    type: types.CLEAR_ARTICLE_EDIT,
  };
}
