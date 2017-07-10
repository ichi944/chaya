// @flow
import { push } from 'react-router-redux';

import * as types from './actionTypes';
import Api from '../services/Api';
import { ARTICLE_API_URL } from './constants';

export function fetchArticles(options: Object = {}) {
  return function (dispatch: Function) {
    dispatch({
      type: types.START_FETCH_ARTICLES,
    });
    console.log('options in action: ', options);
    Api.client
      .get(ARTICLE_API_URL, {
        params: options,
      })
      .then((res) => {
        dispatch({
          type: types.END_FETCH_ARTICLES,
          data: res.data,
        });
      }); // Api
  };
}

export function fetchArticleById(id: number) {
  return function (dispatch: Function) {
    dispatch({
      type: types.START_FETCH_ARTICLE,
    });

    Api.client.get(`/articles/${id}`).then((res) => {
      console.log('got article');
      dispatch({
        type: types.END_FETCH_ARTICLE,
        data: res.data,
      });
    }); // Api
  };
}

export function clearArticle() {
  return {
    type: types.CLEAR_ARTICLE,
  };
}

export function updateArticleAddForm(name: string, value: any) {
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
export function createNewArticle(data: Object) {
  return function (dispatch: Function) {
    Api.client.post('/articles/', data).then((res: Object) => {
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
  return function (dispatch: Function, getState: Function) {
    dispatch(clearArticleAdd());
    dispatch(closeConfirmSuccessDialog());

    const currentChannelId = getState().articleChannel.channel.id;
    dispatch(push(`/app/articles/channel/${currentChannelId}`));
  };
}

export function updateArticleEditForm(name: string, value: any) {
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

export function successUpdateArticle() {
  return {
    type: types.SUCCESS_UPDATE_ARTICLE,
  };
}
export function requestUpdateArticle(data: Object) {
  return function (dispatch: Function) {
    const id: number = data.id;
    Api.client.put(`/articles/${id}`, data).then(() => {
      dispatch(successUpdateArticle());
    });
  };
}

export function closeConfirmSuccessUpdatingDialog() {
  return {
    type: types.CLOSE_CONFIRM_SUCCESS_UPDATING_DIALOG,
  };
}
export function confirmedSuccessUpdating(id: number) {
  return function (dispatch: Function) {
    dispatch(clearArticleEdit());
    dispatch(closeConfirmSuccessUpdatingDialog());
    dispatch(push(`/app/articles/${id}`));
  };
}

export function showConfirmDeleteArticleDialog() {
  return {
    type: types.SHOW_CONFIRM_DELETE_ARTICLE_DIALOG,
  };
}

export function closeConfirmDeleteArticleDialog() {
  return {
    type: types.CLOSE_CONFIRM_DELETE_ARTICLE_DIALOG,
  };
}

export function successDeleteArticle() {
  return {
    type: types.SUCCESS_DELETE_ARTICLE,
  };
}

export function deleteArticleById(id: number) {
  return function (dispatch: Function) {
    console.log('deleting', id);
    Api.client.delete(`/articles/${id}`).then(() => {
      dispatch(successDeleteArticle());
      dispatch(push('/app/articles/'));
    });
  };
}

export function updateSearchQuery(query: string = '') {
  return {
    type: types.UPDATE_SEARCH_QUERY,
    query,
  };
}

export function requestSearch(query: string = '') {
  return (dispatch: Function) => {
    const options = {
      query,
    };
    dispatch(fetchArticles(options));
  };
}

export function fetchArticlesByChannel(channel_id: number, options: Object) {
  return (dispatch: Function) => {
    Api.client
      .get(`channels/${channel_id}/articles`, {
        params: options,
      })
      .then((res) => {
        dispatch({
          type: types.END_FETCH_ARTICLES_BY_CHANNEL,
          data: res.data,
        });
      }); // Api
  };
}

export function openDescriptionEditor() {
  return {
    type: types.OPEN_DESCRIPTION_EDITOR,
  };
}

export function closeDescriptionEditor() {
  return {
    type: types.CLOSE_DESCRIPTION_EDITOR,
  };
}

export function changeDescriptionEditorContent(value: string) {
  return {
    type: types.CHANGE_DESCRIPTION_EDITOR_CONTENT,
    content: value,
  };
}
