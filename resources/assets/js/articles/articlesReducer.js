import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  data: [],
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
      const data = action.data.data;
      return {
        ...state,
        isFetching: false,
        data,
      };
    }
    default: {
      return state;
    }
  }
}
