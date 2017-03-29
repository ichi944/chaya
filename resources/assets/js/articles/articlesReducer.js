import * as types from './actionTypes';

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

export default function articlesReducer(state = initialState, action) {
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
