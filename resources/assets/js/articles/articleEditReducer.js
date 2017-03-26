import * as types from './actionTypes';

const initialState = {
  heading: '',
  body: '',
  onPreview: false,
  confirmSuccessDialogOpen: false,
};

export default function articleEditReducer(state = initialState, action) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const data = action.data;
      return {
        ...state,
        ...data,
      };
    }
    case types.UPDATE_ARTICLE_EDIT_FORM: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case types.TOGGLE_PREVIEW_MODE_ON_EDIT_FORM: {
      return {
        ...state,
        onPreview: !state.onPreview,
      };
    }
    case types.CLEAR_ARTICLE_EDIT: {
      return {
        ...state,
        heading: '',
        body: '',
        onPreview: false,
      };
    }
    default: {
      return state;
    }
  }
}
