import * as types from './actionTypes';

const initialState = {
  heading: '',
  body: '',
  onPreview: false,
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
    default: {
      return state;
    }
  }
}
