import { connect } from 'react-redux';

import ArticleEdit from './ArticleEdit';

import {
  fetchArticleById,
  updateArticleEditForm,
  togglePreviewModeOnEditForm,
  clearArticleEdit,
} from './actions';

const mapStateToProps = ({ articleEdit }) => {
  return {
    ...articleEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize(articleId) {
      dispatch(fetchArticleById(articleId));
    },
    handleChange(e) {
      dispatch(updateArticleEditForm(e.target.name, e.target.value));
    },
    handleTogglePreview() {
      dispatch(togglePreviewModeOnEditForm());
    },
    clearEditorContent() {
      dispatch(clearArticleEdit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
