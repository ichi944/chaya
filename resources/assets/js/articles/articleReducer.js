import * as types from './actionTypes';

const initialState = {
  id: null,
  heading: '',
  body: '',
  created_at: '',
  user: {
    name: '',
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
    case types.SUCCESS_DELETE_ARTICLE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
