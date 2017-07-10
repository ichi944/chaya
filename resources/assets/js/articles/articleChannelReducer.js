// @flow
import * as types from './actionTypes';
import * as channelActionTypes from '../channel/actionTypes';

type ArticleChannelState = {
  articles: {
    +isFetching: boolean,
    +current_page: ?number,
    +data: Array<Object>,
    +from: ?number,
    +last_page: ?number,
    +next_page_url: ?string,
    +per_page: ?number,
    +prev_page_url: ?string,
    +to: ?number,
    +total: ?number,
  },
  channel: {
    +id: ?number,
    +name: ?string,
    // +description: ?string,
    +updated_at: ?string,
    +created_at: ?string,
  },
  descriptionEditorIsOpen: boolean,
  descriptionEditorContent: ?string,
};

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

export default function articleChannelReducer(
  state: ArticleChannelState = initialState,
  action: any,
) {
  switch (action.type) {
    case types.END_FETCH_ARTICLES_BY_CHANNEL: {
      const data = action.data;
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
