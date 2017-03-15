import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Divider,
  FlatButton,
  FloatingActionButton,
} from 'material-ui';

import LabelIcon from 'material-ui/svg-icons/action/label';
import EditerModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import { grey400 } from 'material-ui/styles/colors';

class ArticleDetail extends Component {
  render() {

    const {
      id,
      heading,
      body,
      user,
      created_at,
    } = this.props.article;
    const handleDelete = () => {
      console.log('delete');
    };
    const styles = {
      backButton: {
        margin: '1rem 0 0 1rem',
      },
      tagIcon: {
        width: '16px',
        height: '16px',
      },
    };
    return (
      <div>
        <FlatButton
          style={styles.backButton}
          label="back"
          containerElement={<Link to="/app/articles" />}
        />
        <Paper className="article-wrapper">
          <div className="article-header">
            <h2>{ heading }</h2>
            <ul className="article-tags">
              <li className="article-tag_list_item"><LabelIcon style={styles.tagIcon} color={grey400} viewBox="0 0 24 20" />ランチ</li>
              <li className="article-tag_list_item"><LabelIcon style={styles.tagIcon} color={grey400} viewBox="0 0 24 20" />とりあえず</li>
            </ul>
          </div>
          <Divider />
          <div className="article-meta">
            <FloatingActionButton
              className="article-edit_button"
              containerElement={<Link to={`/app/articles/${id}/edit`} />}
            >
              <EditerModeEdit />
            </FloatingActionButton>
            <p>{user.name}</p>
            <date className="article-date">{created_at} 作成</date>
          </div>
          <div
            className="markdown-body article-body"
            children={body}
            // dangerouslySetInnerHTML={{ __html: this.getMd(body) }}
          />
          <div className="article-actions">
            <FlatButton
              label="削除"
              onTouchTap={handleDelete}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default ArticleDetail;
