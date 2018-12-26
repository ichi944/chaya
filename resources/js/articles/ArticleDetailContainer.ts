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
  downloadAttachment,
} from './actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ article, auth }: RootState) => {
  return {
    article,
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearContent() {
      dispatch(clearArticle());
    },
    initialize(id: number) {
      dispatch(fetchArticleById(id));
    },
    handleConfirmDeleteArticle() {
      dispatch(showConfirmDeleteArticleDialog());
    },
    handleCancelDelete() {
      dispatch(closeConfirmDeleteArticleDialog());
    },
    handleDelete(id: number) {
      dispatch(deleteArticleById(id));
    },
    handlePinArticle(id: number) {
      dispatch(requestPinArticle(id));
    },
    handleUnpinArticle(id: number) {
      dispatch(requestUnpinArticle(id));
    },
    handleDownloadAttachment(id: number, filename: string) {
      dispatch(downloadAttachment(id, filename));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);
