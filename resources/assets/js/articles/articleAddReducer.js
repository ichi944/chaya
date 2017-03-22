import * as types from './actionTypes';

const initialState = {
  heading: '',
  body: '',
  onPreview: false,
  mode: 'new',
};

export default function articleAddReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_ARTICLE_ADD_FORM: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case types.TOGGLE_PREVIEW_MODE: {
      return {
        ...state,
        onPreview: !state.onPreview,
      };
    }
    case types.CLEAR_ARTICLE_ADD: {
      return {
        ...state,
        heading: '',
        body: '',
        onPreview: false,
      };
    }
    case types.SUCCESS_CREATE_ARTICLE: {
      console.log('successCreateArticle in reducer');
      return state;
    }
    default: {
      return state;
    }
  }
}
