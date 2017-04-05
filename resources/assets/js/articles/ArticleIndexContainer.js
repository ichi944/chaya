import { connect } from 'react-redux';
import url from 'url';

import ArticleIndex from './ArticleIndex';
import { fetchArticles } from './actions';


const mapStateToProps = ({ articles, searcher }) => {
  return {
    articles,
    searcher,
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
    handlePrevPage(e, prevUrl, query = null) {
      const parsed = url.parse(prevUrl, true);
      const options = {
        page: parsed.query.page,
        query,
      };
      dispatch(fetchArticles(options));
    },
    handleNextPage(e, nextUrl, query = null) {
      const parsed = url.parse(nextUrl, true);
      const options = {
        page: parsed.query.page,
        query,
      };
      dispatch(fetchArticles(options));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);
