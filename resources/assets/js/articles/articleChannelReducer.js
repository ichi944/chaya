// @flow
import * as types from './actionTypes';

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
    +updated_at: ?string,
    +created_at: ?string,
  },
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
    updated_at: null,
    created_at: null,
  },
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
    default: {
      return state;
    }
  }
}
