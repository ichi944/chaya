import { connect } from 'react-redux';

import ArticleEdit from './ArticleEdit';

import {
  fetchArticleById,
  updateArticleEditForm,
  togglePreviewModeOnEditForm,
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
