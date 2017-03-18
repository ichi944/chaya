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
    default: {
      return state;
    }
  }
}
