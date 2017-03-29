import { connect } from 'react-redux';

import ArticleIndex from './ArticleIndex';
import { fetchArticles } from './actions';

const mapStateToProps = ({ articles }) => {
  return {
    articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize() {
      dispatch(fetchArticles());
    },
    handlePrevPage(e, url) {
      const options = {
        url,
      };
      dispatch(fetchArticles(options));
    },
    handleNextPage(e, url) {
      const options = {
        url,
      };
      dispatch(fetchArticles(options));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);
