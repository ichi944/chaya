import { connect } from 'react-redux';

import ArticleDetail from './ArticleDetail';
import { fetchArticleById } from './actions';

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
