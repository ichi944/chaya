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
