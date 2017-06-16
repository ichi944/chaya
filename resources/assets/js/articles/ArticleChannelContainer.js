import { connect } from 'react-redux';
import url from 'url';

import ArticleChannel from './ArticleChannel';
import { fetchArticlesByChannel } from './actions';

const mapStateToProps = ({ articleChannel, searcher, auth }) => {
  return {
    articleChannel,
    searcher,
    auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize(channel_id = null, current_page = null) {
      if (!channel_id) {
        console.log('@ArticleChannelContainer channel_id is not provided');
        return;
      }
      let options = {};
      options = current_page ? { ...options, page: current_page } : options;
      dispatch(fetchArticlesByChannel(channel_id, options));
    },
    handleNavigatePage(nextUrl, query) {
      const { channel_id } = ownProps.match.params;
      const { page } = url.parse(nextUrl, true).query;
      const options = {
        page,
      };
      // TODO: consider about search query on channel.
      // options = query ? { ...options, query } : options;
      dispatch(fetchArticlesByChannel(channel_id, options));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleChannel);
