// @flow
import * as types from './actionTypes';
import Api from '../services/Api';

export function fetchArticlesByChannel(channel_id: number, options: Object) {
  return (dispatch: Function) => {
    Api.client
      .get(`channels/${channel_id}/articles`, {
        params: options,
      })
      .then((res) => {
        if (res.data._code !== 0) {
          console.log('failed fetching articles');
          return;
        }
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

export function requestClearActiveChannel() {
  return {
    type: types.CLEAR_ACTIVE_CHANNEL,
  };
}
