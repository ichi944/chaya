import { Dispatch } from 'redux';
import { push, RouterAction } from 'connected-react-router';
import { AxiosResponse } from 'axios';
import * as types from './actionTypes';
import Api from '../services/Api';
import { ArticleActions } from './interfaces/Article';
import UpdateRequestProps from './interfaces/UpdateRequest';
import CurrentAttachmentProps from './interfaces/CurrentAttachment';
import AttachmentProps from './interfaces/Attachment';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../interfaces/rootState';

export const startFetchArticle = (): ArticleActions => ({
  type: types.START_FETCH_ARTICLE,
});

export const endFetchArticle = (data): ArticleActions => ({
  type: types.END_FETCH_ARTICLE,
  data,
});

export const fetchArticleById = (
  id: number,
): ThunkAction<void, RootState, undefined, ArticleActions> => async (dispatch: Dispatch) => {
  dispatch(startFetchArticle());

  const res: AxiosResponse = await Api.client.get(
    `/articles/${id}?timestamp=${new Date().getTime()}`,
  );

  dispatch(endFetchArticle(res.data));
};

export const clearArticle = (): ArticleActions => ({
  type: types.CLEAR_ARTICLE,
});

export const updateArticleAddForm = (name: string, value: any): ArticleActions => ({
  type: types.UPDATE_ARTICLE_ADD_FORM,
  name,
  value,
});

export const fileAddedArticleAddForm = (attachment: any): ArticleActions => ({
  type: types.FILE_ADDED_ARTICLE_ADD_FORM,
  attachment,
});

export const deleteAttachementByIndex = (index: number): ArticleActions => ({
  type: types.DELETE_ATTACHMENT_BY_INDEX,
  index,
});
export const togglePreviewMode = (): ArticleActions => ({
  type: types.TOGGLE_PREVIEW_MODE,
});

export const clearArticleAdd = (): ArticleActions => ({
  type: types.CLEAR_ARTICLE_ADD,
});

export const successCreateArticle = (): ArticleActions => ({
  type: types.SUCCESS_CREATE_ARTICLE,
});
export const createNewArticle = (data: {
  heading: string;
  body: string;
  attachments: AttachmentProps[];
  channelId: number;
}): ThunkAction<void, RootState, undefined, ArticleActions> => async dispatch => {
  const { heading, body, attachments, channelId } = data;
  const formData = new FormData();
  attachments.forEach(f => {
    formData.append('attachments[]', f);
  });
  formData.append('heading', heading);
  formData.append('body', body);
  formData.append('channelId', channelId.toString());
  const res: AxiosResponse = await Api.client.post('/articles/', formData);
  console.log(res.data);
  dispatch(successCreateArticle());
};

export const closeConfirmSuccessDialog = (): ArticleActions => ({
  type: types.CLOSE_CONFIRM_SUCCESS_DIALOG,
});

export const confirmedSuccessCreating = (): ThunkAction<
  void,
  RootState,
  undefined,
  ArticleActions | RouterAction
> => async (dispatch, getState) => {
  dispatch(clearArticleAdd());
  dispatch(closeConfirmSuccessDialog());

  const channel = getState().articleLists.channel;
  if (!channel) {
    return;
  }
  dispatch(push(`/app/channels/${channel.id}/articles`));
};

export const updateArticleEditForm = (name: string, value: string): ArticleActions => ({
  type: types.UPDATE_ARTICLE_EDIT_FORM,
  name,
  value,
});

export const togglePreviewModeOnEditForm = (): ArticleActions => ({
  type: types.TOGGLE_PREVIEW_MODE_ON_EDIT_FORM,
});

export const clearArticleEdit = (): ArticleActions => ({
  type: types.CLEAR_ARTICLE_EDIT,
});

export const attachmentAddedArticleEditForm = (attachment: any): ArticleActions => ({
  type: types.ATTACHMENT_ADDED_ARTICLE_EDIT_FORM,
  attachment,
});

export const deleteAttachementOnArticleEditForm = (index: number): ArticleActions => ({
  type: types.DELETE_ATTACHMENT_ARTICLE_EDIT_FORM,
  index,
});

export const showDialogDeleteCurrentAtttachment = (
  attachment: CurrentAttachmentProps,
): ArticleActions => ({
  type: types.SHOW_DIALOG_DELETE_CURRENT_ATTACHMENT,
  attachment,
});

export const closeDialogDeleteCurrentAttachment = (): ArticleActions => ({
  type: types.CLOSE_DIALOG_DELETE_CURRENT_ATTACHMENT,
});

export const deleteCurrentAttachmentSucceeded = (
  current_attachments: CurrentAttachmentProps[],
): ArticleActions => ({
  type: types.DELETE_CURRENT_ATTACHMENT_SUCCEEDED,
  current_attachments,
});

export const requestDeleteCurrentAttachment = (): ThunkAction<
  void,
  RootState,
  undefined,
  ArticleActions
> => async (dispatch, getState) => {
  const id = getState().articleEdit.deletingAttachmentId;
  const res: AxiosResponse = await Api.client.delete(`article-attachments/${id}`);
  if (res.data._code !== 0) {
    console.log('error: failed to delete an article attachment');
    return;
  }
  const { current_attachments } = res.data;
  dispatch(deleteCurrentAttachmentSucceeded(current_attachments));
  dispatch(closeDialogDeleteCurrentAttachment());
};

export const successUpdateArticle = (): ArticleActions => {
  return {
    type: types.SUCCESS_UPDATE_ARTICLE,
  };
};
export const requestUpdateArticle = (
  data: UpdateRequestProps,
): ThunkAction<void, RootState, undefined, ArticleActions> => async (dispatch, getState) => {
  const { id } = data;
  const { attachments } = getState().articleEdit;
  const formData = new FormData();
  attachments.forEach((f: AttachmentProps) => {
    formData.append('attachments[]', f);
  });
  formData.append('heading', data.heading);
  formData.append('body', data.body);
  // axios.put() doesn't work. this is workaround.
  // https://github.com/laravel/framework/issues/13457
  formData.append('_method', 'PUT');

  const res: AxiosResponse = await Api.client.post(`/articles/${id}`, formData);
  if (res.data._code !== 0) {
    console.log('error');
    // TODO: need error handling.
    return;
  }
  dispatch(successUpdateArticle());
};

export const closeConfirmSuccessUpdatingDialog = (): ArticleActions => ({
  type: types.CLOSE_CONFIRM_SUCCESS_UPDATING_DIALOG,
});
export const confirmedSuccessUpdating = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(clearArticleEdit());
    dispatch(closeConfirmSuccessUpdatingDialog());
    dispatch(push(`/app/articles/${id}`));
  };
};

export const showConfirmDeleteArticleDialog = (): ArticleActions => ({
  type: types.SHOW_CONFIRM_DELETE_ARTICLE_DIALOG,
});

export const closeConfirmDeleteArticleDialog = (): ArticleActions => ({
  type: types.CLOSE_CONFIRM_DELETE_ARTICLE_DIALOG,
});

export const successDeleteArticle = (): ArticleActions => ({
  type: types.SUCCESS_DELETE_ARTICLE,
});

export const deleteArticleById = (id: number) => {
  return (dispatch: Dispatch, getState) => {
    console.log('deleting', id);
    const currentChannelId = getState().articleLists.channel.id;
    Api.client.delete(`/articles/${id}`).then(() => {
      dispatch(successDeleteArticle());
      dispatch(push(`/app/channels/${currentChannelId}/articles`));
    });
  };
};

export const successPinArticle = (article_id: number): ArticleActions => ({
  type: types.SUCCESS_PIN_ARTICLE,
  article_id,
});

export const successUnpinArticle = (article_id: number): ArticleActions => ({
  type: types.SUCEESS_UNPIN_ARTICLE,
  article_id,
});

export const requestPinArticle = (
  article_id: number,
): ThunkAction<void, RootState, undefined, ArticleActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.put(`articles/${article_id}/pinned`);
  if (res.data._code === 0) {
    dispatch(successPinArticle(article_id));
  }
};

export const requestUnpinArticle = (
  article_id: number,
): ThunkAction<void, RootState, undefined, ArticleActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.put(`articles/${article_id}/unpinned`);
  if (res.data._code === 0) {
    dispatch(successUnpinArticle(article_id));
  }
};
export const downloadAttachment = (
  id: number,
  filename: string,
): ThunkAction<void, RootState, undefined, ArticleActions> => async () => {
  const options = {
    responseType: 'blob',
  };
  const res: AxiosResponse = await Api.client.post(`article-attachments/${id}`, {}, options);
  if (res.status !== 200) {
    alert('can not download the attachment. something went wrong.');
    return;
  }
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
};

export const updateCursorPosition = (cursor_position: number): ArticleActions => ({
  type: types.UPDATE_CURSOR_POSITION,
  cursor_position,
});

export const insertEmbeddedImageURLtoBody = (
  img_tag: string,
  cursor_position: number,
): ArticleActions => ({
  type: types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY,
  img_tag,
  cursor_position,
});

export const requestStoreEmbeddedImage = (
  image: any[],
): ThunkAction<void, RootState, undefined, ArticleActions> => async (dispatch, getState) => {
  const channel = getState().articleLists.channel;
  if (!channel) {
    // TODO: need error handling.
    return;
  }
  const user_id = getState().profile.id;
  if (!user_id) {
    // TODO: need error handling.
    return;
  }
  const data = new FormData();
  data.append('user_id', user_id.toString());
  data.append('channel_id', channel.id.toString());
  data.append('image', image[0]);

  const res: AxiosResponse = await Api.client.post('/embedded-images/', data);
  if (res.data._code !== 0) {
    console.log('error occured');
    return;
  }
  const img_tag = `![${image[0].name}](${res.data.url})`;
  const { cursor_position } = getState().articleAdd;
  dispatch(insertEmbeddedImageURLtoBody(img_tag, cursor_position));
};

export const updateCursorPositionOnEdit = (cursor_position: number): ArticleActions => ({
  type: types.UPDATE_CURSOR_POSITION_ON_EDIT,
  cursor_position,
});

export const insertEmbeddedImageURLtoBodyOnEdit = (
  img_tag: string,
  cursor_position: number,
): ArticleActions => ({
  type: types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY_ON_EDIT,
  img_tag,
  cursor_position,
});

export const requestStoreEmbeddedImageOnEdit = (
  image: any[],
): ThunkAction<void, RootState, undefined, ArticleActions> => async (dispatch, getState) => {
  const channel = getState().articleLists.channel;
  if (!channel) {
    // TODO: need error handling.
    return;
  }
  const user_id = getState().profile.id;
  if (!user_id) {
    return;
  }
  const data = new FormData();
  data.append('user_id', user_id.toString());
  data.append('channel_id', channel.id.toString());
  data.append('image', image[0]);
  const res: AxiosResponse = await Api.client.post('/embedded-images/', data);
  if (res.data._code !== 0) {
    console.log('error occured');
    return;
  }
  const img_tag = `![${image[0].name}](${res.data.url})`;
  const { cursor_position } = getState().articleEdit;
  dispatch(insertEmbeddedImageURLtoBodyOnEdit(img_tag, cursor_position));
};
