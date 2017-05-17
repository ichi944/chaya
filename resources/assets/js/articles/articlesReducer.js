// @flow
import * as types from './actionTypes';

type ArticlesState = {
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
};

const initialState = {
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
};

export default function articlesReducer(state: ArticlesState = initialState, action: any) {
  switch (action.type) {
    case types.START_FETCH_ARTICLES: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.END_FETCH_ARTICLES: {
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
