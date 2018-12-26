import { Action } from 'redux';

import * as types from '../actionTypes';
import { ArticleModel } from '../../articles/interfaces/Article';
import { ChannelModel } from '../../channel/interfaces/channel';

export interface ArticlesState {
  current_page: number | null;
  data: ArticleModel[];
  from: number | null;
  last_page: number | null;
  next_page_url: string | null;
  per_page: number | null;
  prev_page_url: string | null;
  to: number | null;
  total: number | null;
}
export interface ArticleListsState {
  isFetching: boolean;
  articles: ArticlesState;
  channel: ChannelModel | null;
  descriptionEditorIsOpen: boolean;
  descriptionEditorContent: string | null;
}

interface EndFetchArticlesByChannelAction extends Action {
  type: typeof types.END_FETCH_ARTICLES_BY_CHANNEL;
  data: {
    articles: ArticlesState;
    channel: ChannelModel | null;
  };
}
interface OpenDescriptionEditor extends Action {
  type: typeof types.OPEN_DESCRIPTION_EDITOR;
}
interface CloseDescriptionEditor extends Action {
  type: typeof types.CLOSE_DESCRIPTION_EDITOR;
}
interface ChangeDescriptionEditorContent extends Action {
  type: typeof types.CHANGE_DESCRIPTION_EDITOR_CONTENT;
  content: string;
}
interface RequestClearActiveChannel extends Action {
  type: typeof types.CLEAR_ACTIVE_CHANNEL;
}
export type ArticleListActions =
  | EndFetchArticlesByChannelAction
  | OpenDescriptionEditor
  | CloseDescriptionEditor
  | ChangeDescriptionEditorContent
  | RequestClearActiveChannel;
