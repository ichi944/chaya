import { connect } from 'react-redux';

import ArticleDetail from './ArticleDetail';
import {
  fetchArticleById,
  deleteArticleById,
  showConfirmDeleteArticleDialog,
  closeConfirmDeleteArticleDialog,
} from './actions';

const mapStateToProps = ({ article }) => {
  return {
    article,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize(id) {
      dispatch(fetchArticleById(id));
    },
    handleConfirmDeleteArticle() {
      dispatch(showConfirmDeleteArticleDialog());
    },
    handleCancelDelete() {
      dispatch(closeConfirmDeleteArticleDialog());
    },
    handleDelete(id) {
      dispatch(deleteArticleById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
