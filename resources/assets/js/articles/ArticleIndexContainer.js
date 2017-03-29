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
    initialize(current_page = null) {
      if (current_page) {
        const url = `articles?page=${current_page}`;
        const options = {
          url,
        };
        dispatch(fetchArticles(options));
      } else {
        dispatch(fetchArticles());
      }
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
