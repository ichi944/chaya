import { connect } from 'react-redux';

import ArticleAdd from './ArticleAdd';

import {
  updateArticleAddForm,
  togglePreviewMode,
  clearArticleAdd,
  createNewArticle,
} from './actions';

const mapStateToProps = ({ articleAdd }) => {
  return {
    ...articleAdd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch(updateArticleAddForm(e.target.name, e.target.value));
    },
    clearEditorContent() {
      dispatch(clearArticleAdd());
    },
    handleTogglePreview() {
      dispatch(togglePreviewMode());
    },
    handleSubmit(data) {
      dispatch(createNewArticle(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);
