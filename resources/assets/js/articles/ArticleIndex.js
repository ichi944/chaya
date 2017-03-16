import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Paper,
  Divider,
  Subheader,
  FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';


class ArticleIndex extends Component {
  componentDidMount() {
    const { initialize } = this.props;
    initialize();

    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
  }
  handleCreateNewArticle() {
    console.log('tap create new artcle');
  }
  render() {
    const {
      articles,
    } = this.props;

    const styles = {
      button: {
        position: 'absolute',
        right: '2rem',
        top: '1.2rem',
      },
    };

    if (articles.data.length === 0) {
      return (
        <div>no articles</div>
      );
    }
    const articlesEl = articles.data.map((article) => {
      return (
        <Paper key={article.id}>
          <div className="article_index-wrapper">
            <div className="article_index-avatar">
              <Avatar />
            </div>
            <div className="article_index-header">
              <p className="article_index-name">{article.user.name}</p>
              <p className="article_index-date">{article.created_at}</p>
            </div>
            <div className="article_index-body">
              <Link to={`/app/articles/${article.id}`}>
                <h3 className="article_index-article_title">{article.heading}</h3>
                <p className="article_index-description">{article.body}</p>
              </Link>
            </div>
          </div>
        </Paper>
      );
    });

    return (
      <Paper className="article_index-container">
        <Subheader>記事一覧</Subheader>
        <FloatingActionButton
          style={styles.button}
          zDepth={2}
          onTouchTap={this.handleCreateNewArticle}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Divider />
          { articlesEl }
      </Paper>
    );
  }
}

export default ArticleIndex;
