import { Dispatch } from 'redux';
import * as types from './actionTypes';
import Api from '../services/Api';
import { ArticleListActions, ArticlesState } from './interfaces/ArticleList';
import { ChannelModel } from '../channel/interfaces/channel';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../interfaces/rootState';
import { AxiosResponse } from 'axios';

export const endFetchArticlesByChannel = (data: {
  articles: ArticlesState;
  channel: ChannelModel | null;
}): ArticleListActions => ({
  type: types.END_FETCH_ARTICLES_BY_CHANNEL,
  data,
});

interface ArticlesByChannelResponse {
  articles: ArticlesState;
  channel: ChannelModel | null;
  _code: number;
}
export const fetchArticlesByChannel = (
  channel_id: number,
  options: {
    page?: string;
  },
): ThunkAction<void, RootState, undefined, ArticleListActions> => async dispatch => {
  const res: AxiosResponse<ArticlesByChannelResponse> = await Api.client.get(
    `channels/${channel_id}/articles`,
    {
      params: options,
    },
  );
  if (res.data._code !== 0) {
    console.log('failed fetching articles');
    return;
  }
  dispatch(endFetchArticlesByChannel(res.data));
};

export const openDescriptionEditor = (): ArticleListActions => ({
  type: types.OPEN_DESCRIPTION_EDITOR,
});

export const closeDescriptionEditor = (): ArticleListActions => ({
  type: types.CLOSE_DESCRIPTION_EDITOR,
});

export const changeDescriptionEditorContent = (value: string): ArticleListActions => ({
  type: types.CHANGE_DESCRIPTION_EDITOR_CONTENT,
  content: value,
});

export const requestClearActiveChannel = (): ArticleListActions => ({
  type: types.CLEAR_ACTIVE_CHANNEL,
});
