import React, { Component } from 'react';
import { Paper, Divider, Subheader, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SearcherContainer from './SearcherContainer';
import { ArticleListItem } from './organisms/ArticleListItem';
import { PageNavigation } from './organisms/PageNavigation';

class ArticleChannel extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    const { current_page = null } = this.props.articleChannel.articles;
    const { channel_id } = this.props.match.params;

    initialize(channel_id, current_page);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channel_id !== nextProps.match.params.channel_id) {
      const { initialize } = this.props;
      const { channel_id } = nextProps.match.params;

      initialize(channel_id, null);
    }
  }
  handleCreateNewArticle() {
    const { push } = this.props.history;
    push('articles/add');
  }
  render() {
    const {
      data,
      total,
      from,
      to,
      prev_page_url,
      next_page_url,
    } = this.props.articleChannel.articles;
    const { handleNavigatePage } = this.props;
    const { authorizationToken } = this.props.auth;

    const pageNavigationProps = {
      prev_page_url,
      next_page_url,
      handleNavigatePage,
    };

    const styles = {
      button: {
        position: 'absolute',
        right: '2rem',
        top: '1.2rem',
      },
    };

    return (
      <div>
        <Paper className="article_index-container">
          <Subheader>Feed {from}件目〜{to}件目 (全{total}件)</Subheader>
          <FloatingActionButton
            style={styles.button}
            zDepth={2}
            onTouchTap={this.handleCreateNewArticle}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          {data.length === 0
            ? <Paper>
              <div className="article_index-wrapper">
                  記事がありませんでした。
                </div>
            </Paper>
            : data.map((article) => {
              return (
                <ArticleListItem
                  article={article}
                  authorizationToken={authorizationToken}
                  key={article.id}
                />
              );
            })}
        </Paper>
        <PageNavigation {...pageNavigationProps} />
      </div>
    );
  }
}

export default ArticleChannel;
