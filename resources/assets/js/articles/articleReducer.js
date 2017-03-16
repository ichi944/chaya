import * as types from './actionTypes';

const initialState = {
  id: 1,
  heading: 'aaa',
  body: '# asdf\n\nthis is test',
  created_at: '2017-03-14',
  user: {
    name: 'no name',
  },
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const data = action.data;
      return {
        ...state,
        ...data,
      };
    }
    default: {
      return state;
    }
  }
}
