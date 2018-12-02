import * as types from './actionTypes';
import * as channelActionTypes from '../channel/actionTypes';

interface ArticleListsState {
  articles: {
    isFetching: boolean;
    current_page: number | null;
    data: object[];
    from: number | null;
    last_page: number | null;
    next_page_url: string | null;
    per_page: number | null;
    prev_page_url: string | null;
    to: number | null;
    total: number | null;
  };
  channel: {
    id: number | null;
    name: string | null;
    description: string | null;
    updated_at: string | null;
    created_at: string | null;
  };
  descriptionEditorIsOpen: boolean;
  descriptionEditorContent: string | null;
}

const initialState = {
  articles: {
    isFetching: false,
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
  channel: {
    id: null,
    name: null,
    description: null,
    updated_at: null,
    created_at: null,
  },
  descriptionEditorIsOpen: false,
  descriptionEditorContent: '',
};

export default function articleListsReducer(state: ArticleListsState = initialState, action: any) {
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
}
