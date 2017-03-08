import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Paper,
  Divider,
  Subheader,
} from 'material-ui';

class ArticleIndex extends Component {
  render() {
    const user = {
      name: 'foo bar',
    };
    const article = {
      id: 1,
      user: user,
      created_at: '2016/3/8',
      heading: 'テスト見出し',
      body: 'Lorem Ipsam',
    };
    return (
      <Paper className="article_index-container">
        <Subheader>記事一覧</Subheader>
        <Divider />
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
      </Paper>
    );
  }
}

export default ArticleIndex;
