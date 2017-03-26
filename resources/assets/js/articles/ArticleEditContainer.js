import { connect } from 'react-redux';

import ArticleEdit from './ArticleEdit';

import {
  fetchArticleById,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
