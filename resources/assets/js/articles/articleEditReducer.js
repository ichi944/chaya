// @flow
import * as types from './actionTypes';

type ArticleEditState = {
  +heading: string,
  +body: string,
  onPreview: boolean,
  confirmSuccessDialogOpen: boolean,
}

const initialState = {
  heading: '',
  body: '',
  onPreview: false,
  confirmSuccessDialogOpen: false,
};

export default function articleEditReducer(state: ArticleEditState = initialState, action: any) {
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
    case types.SUCCESS_UPDATE_ARTICLE: {
      return {
        ...state,
        confirmSuccessDialogOpen: true,
      };
    }
    case types.CLOSE_CONFIRM_SUCCESS_UPDATING_DIALOG: {
      return {
        ...state,
        confirmSuccessDialogOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
