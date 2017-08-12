import { connect } from 'react-redux';

import ArticleDetail from './ArticleDetail';
import {
  clearArticle,
  fetchArticleById,
  deleteArticleById,
  showConfirmDeleteArticleDialog,
  closeConfirmDeleteArticleDialog,
  requestPinArticle,
  requestUnpinArticle,
} from './actions';

const mapStateToProps = ({ article, auth }) => {
  return {
    article,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearContent() {
      dispatch(clearArticle());
    },
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
    handlePinArticle(id) {
      dispatch(requestPinArticle(id));
    },
    handleUnpinArticle(id) {
      dispatch(requestUnpinArticle(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
