import * as types from './actionTypes';
import * as channelActionTypes from '../channel/actionTypes';
import { ArticleListsState, ArticleListActions } from './interfaces/ArticleList';
import { ChannelActions } from '../channel/interfaces/channel';

const initialState = {
  isFetching: true,
  articles: {
    current_page: null,
    data: [],
    from: null,
    last_page: null,
    next_page_url: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  },
  channel: null,
  descriptionEditorIsOpen: false,
  descriptionEditorContent: '',
};

export default (
  state: ArticleListsState = initialState,
  action: ArticleListActions | ChannelActions,
): ArticleListsState => {
  switch (action.type) {
    case types.END_FETCH_ARTICLES_BY_CHANNEL: {
      const { data } = action;
      return {
        ...state,
        ...data,
        isFetching: false,
      };
    }
    case types.OPEN_DESCRIPTION_EDITOR: {
      return {
        ...state,
        descriptionEditorIsOpen: true,
      };
    }
    case types.CLOSE_DESCRIPTION_EDITOR: {
      return {
        ...state,
        descriptionEditorIsOpen: false,
        descriptionEditorContent: '',
      };
    }
    case channelActionTypes.UPDATE_DESCRIPTION_IS_SUCCEEDED: {
      const { updated_channel } = action;
      return {
        ...state,
        channel: updated_channel,
      };
    }
    case types.CHANGE_DESCRIPTION_EDITOR_CONTENT: {
      const { content } = action;
      return {
        ...state,
        descriptionEditorContent: content,
      };
    }
    case types.CLEAR_ACTIVE_CHANNEL: {
      return {
        ...state,
        channel: initialState.channel,
      };
    }
    default: {
      return state;
    }
  }
};
