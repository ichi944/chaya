import { connect } from 'react-redux';
import url from 'url';

import ArticleIndex from './ArticleIndex';
import { fetchArticles } from './actions';


const mapStateToProps = ({ articles, searcher, auth }) => {
  return {
    articles,
    searcher,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize(current_page = null, query) {
      let options = {};
      options = current_page ? { ...options, page: current_page } : options;
      options = query ? { ...options, query } : options;
      dispatch(fetchArticles(options));
    },
    handleNavigatePage(nextUrl, query) {
      const { page } = url.parse(nextUrl, true).query;
      let options = {
        page,
      };
      options = query ? { ...options, query } : options;
      dispatch(fetchArticles(options));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);
