import * as types from './actionTypes';

const initialState = {
  id: 1,
  heading: 'aaa',
  body: '# asdf\n\nthis is test',
  created_at: '2017-03-14',
  user: {
    name: 'no name',
  },
  confirmDeleteDialogOpen: false,
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
    case types.SHOW_CONFIRM_DELETE_ARTICLE_DIALOG: {
      return {
        ...state,
        confirmDeleteDialogOpen: true,
      };
    }
    case types.CLOSE_CONFIRM_DELETE_ARTICLE_DIALOG: {
      return {
        ...state,
        confirmDeleteDialogOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
