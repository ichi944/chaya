// @flow
import { push } from 'connected-react-router';

import * as types from './actionTypes';
import Api from '../services/Api';
import { ARTICLE_API_URL } from './constants';

export function fetchArticles(options: Object = {}) {
  return (dispatch: Function) => {
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
  return (dispatch: Function) => {
    dispatch({
      type: types.START_FETCH_ARTICLE,
    });

    Api.client.get(`/articles/${id}?timestamp=${new Date().getTime()}`).then((res) => {
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

export function fileAddedArticleAddForm(attachment: any) {
  return {
    type: types.FILE_ADDED_ARTICLE_ADD_FORM,
    attachment,
  };
}

export function deleteAttachementByIndex(index: number) {
  return {
    type: types.DELETE_ATTACHMENT_BY_INDEX,
    index,
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
  return (dispatch: Function) => {
    const {
      heading, body, attachments, channelId,
    } = data;
    const formData = new FormData();
    attachments.forEach((f) => {
      formData.append('attachments[]', f);
    });
    formData.append('heading', heading);
    formData.append('body', body);
    formData.append('channelId', channelId);
    Api.client.post('/articles/', formData).then((res: Object) => {
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
  return (dispatch: Function, getState: Function) => {
    dispatch(clearArticleAdd());
    dispatch(closeConfirmSuccessDialog());

    const currentChannelId = getState().articleLists.channel.id;
    dispatch(push(`/app/channels/${currentChannelId}/articles`));
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

export function attachmentAddedArticleEditForm(attachment: any) {
  return {
    type: types.ATTACHMENT_ADDED_ARTICLE_EDIT_FORM,
    attachment,
  };
}

export function deleteAttachementOnArticleEditForm(index: number) {
  return {
    type: types.DELETE_ATTACHMENT_ARTICLE_EDIT_FORM,
    index,
  };
}

export function showDialogDeleteCurrentAtttachment(attachment: Object) {
  const { id } = attachment;
  const { name } = attachment;
  return {
    type: types.SHOW_DIALOG_DELETE_CURRENT_ATTACHMENT,
    id,
    name,
  };
}

export function closeDialogDeleteCurrentAttachment() {
  return {
    type: types.CLOSE_DIALOG_DELETE_CURRENT_ATTACHMENT,
  };
}
export function deleteCurrentAttachmentSucceeded(current_attachments: Array<Object>) {
  return {
    type: types.DELETE_CURRENT_ATTACHMENT_SUCCEEDED,
    current_attachments,
  };
}
export function requestDeleteCurrentAttachment() {
  return (dispatch: Function, getState: Function) => {
    const id = getState().articleEdit.deletingAttachmentId;
    Api.client.delete(`article-attachments/${id}`).then((res) => {
      if (res.data._code !== 0) {
        console.log('error: failed to delete an article attachment');
        return;
      }
      const { current_attachments } = res.data;
      dispatch(deleteCurrentAttachmentSucceeded(current_attachments));
      dispatch(closeDialogDeleteCurrentAttachment());
    });
  };
}

export function successUpdateArticle() {
  return {
    type: types.SUCCESS_UPDATE_ARTICLE,
  };
}
export function requestUpdateArticle(data: Object) {
  return (dispatch: Function, getState: Function) => {
    const { id } = data;
    const { attachments } = getState().articleEdit;
    const formData = new FormData();
    attachments.forEach((f) => {
      formData.append('attachments[]', f);
    });
    formData.append('heading', data.heading);
    formData.append('body', data.body);
    // axios.put() doesn't work. this is workaround.
    // https://github.com/laravel/framework/issues/13457
    formData.append('_method', 'PUT');

    Api.client.post(`/articles/${id}`, formData).then(() => {
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
  return (dispatch: Function) => {
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
  return (dispatch: Function, getState: Function) => {
    console.log('deleting', id);
    const currentChannelId = getState().articleLists.channel.id;
    Api.client.delete(`/articles/${id}`).then(() => {
      dispatch(successDeleteArticle());
      dispatch(push(`/app/channels/${currentChannelId}/articles`));
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

export function successPinArticle(article_id: number) {
  return {
    type: types.SUCCESS_PIN_ARTICLE,
    article_id,
  };
}

export function successUnpinArticle(article_id: number) {
  return {
    type: types.SUCEESS_UNPIN_ARTICLE,
    article_id,
  };
}

export function requestPinArticle(article_id: number) {
  return (dispatch: Function) => {
    Api.client.put(`articles/${article_id}/pinned`).then((res) => {
      if (res.data._code === 0) {
        dispatch(successPinArticle(article_id));
      }
    });
  };
}

export function requestUnpinArticle(article_id: number) {
  return (dispatch: Function) => {
    Api.client.put(`articles/${article_id}/unpinned`).then((res) => {
      if (res.data._code === 0) {
        dispatch(successUnpinArticle(article_id));
      }
    });
  };
}

export function downloadAttachment(id: number, filename: string) {
  return () => {
    const options = {
      responseType: 'blob',
    };
    Api.client.post(`article-attachments/${id}`, {}, options).then((res) => {
      if (res.status !== 200) {
        alert('can not download the attachment. something went wrong.');
        return;
      }
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.click();
    });
  };
}

export function updateCursorPosition(cursor_position: Number) {
  return {
    type: types.UPDATE_CURSOR_POSITION,
    cursor_position,
  };
}

export function insertEmbeddedImageURLtoBody(img_tag: any, cursor_position: number) {
  return {
    type: types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY,
    img_tag,
    cursor_position,
  };
}

export function requestStoreEmbeddedImage(image: Array<Object>) {
  return (dispatch: Function, getState: Function) => {
    const channel_id = getState().articleLists.channel.id;
    const data = new FormData();
    const user_id = getState().profile.id;
    data.append('user_id', user_id);
    data.append('channel_id', channel_id);
    data.append('image', image[0]);
    Api.client.post('/embedded-images/', data).then((res) => {
      if (res.data._code !== 0) {
        console.log('error occured');
        return;
      }
      const img_tag = `![${image[0].name}](${res.data.url})`;
      const { cursor_position } = getState().articleAdd;
      dispatch(insertEmbeddedImageURLtoBody(img_tag, cursor_position));
    });
  };
}

export function updateCursorPositionOnEdit(cursor_position: Number) {
  return {
    type: types.UPDATE_CURSOR_POSITION_ON_EDIT,
    cursor_position,
  };
}

export function insertEmbeddedImageURLtoBodyOnEdit(img_tag: any, cursor_position: number) {
  return {
    type: types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY_ON_EDIT,
    img_tag,
    cursor_position,
  };
}

export function requestStoreEmbeddedImageOnEdit(image: Array<Object>) {
  return (dispatch: Function, getState: Function) => {
    const channel_id = getState().article.channel_id;
    const data = new FormData();
    const user_id = getState().profile.id;
    data.append('user_id', user_id);
    data.append('channel_id', channel_id);
    data.append('image', image[0]);
    Api.client.post('/embedded-images/', data).then((res) => {
      if (res.data._code !== 0) {
        console.log('error occured');
        return;
      }
      const img_tag = `![${image[0].name}](${res.data.url})`;
      const { cursor_position } = getState().articleEdit;
      dispatch(insertEmbeddedImageURLtoBodyOnEdit(img_tag, cursor_position));
    });
  };
}
