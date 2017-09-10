import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Divider, Checkbox, FlatButton, FloatingActionButton, Avatar } from 'material-ui';

import LabelIcon from 'material-ui-icons/Label';
import EditerModeEdit from 'material-ui-icons/ModeEdit';

import { grey400 } from 'material-ui/colors';

import parseToMarkdown from '../services/parseToMarkdown';
import { ConfirmDeleteArticleDialog } from './organisms/Dialogs';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onCheckPin = this.onCheckPin.bind(this);
  }
  componentWillMount() {
    const { clearContent } = this.props;
    clearContent();
  }
  componentDidMount() {
    const { initialize, match } = this.props;
    initialize(match.params.id);
  }
  onCheckPin(e, isInputChecked) {
    console.log(isInputChecked);
    const { id } = this.props.article;
    if (isInputChecked) {
      this.props.handlePinArticle(id);
    } else {
      this.props.handleUnpinArticle(id);
    }
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const {
      id,
      heading,
      body,
      user,
      created_at,
      pinned,
      confirmDeleteDialogOpen,
    } = this.props.article;
    const { authorizationToken } = this.props.auth;
    const { handleConfirmDeleteArticle, handleCancelDelete, handleDelete } = this.props;
    if (!id) {
      return <div />;
    }
    const styles = {
      backButton: {
        margin: '1rem 0 0 1rem',
      },
      tagIcon: {
        width: '16px',
        height: '16px',
      },
      pin: {
        fontSize: '12px',
      },
      pinIconStyle: {
        width: '14px',
        marginRight: '6px',
      },
    };
    console.log('@article detail', pinned);
    return (
      <div>
        <FlatButton style={styles.backButton} label="back" onTouchTap={this.goBack} />
        <Paper className="article-wrapper">
          <div className="article-header">
            <h2>{heading}</h2>
            <div>
              <Checkbox
                label="pin"
                iconStyle={styles.pinIconStyle}
                checked={pinned}
                onCheck={this.onCheckPin}
              />
            </div>
            <ul className="article-tags">
              <li className="article-tag_list_item">
                <LabelIcon style={styles.tagIcon} color={grey400} viewBox="0 0 24 20" />ランチ
              </li>
              <li className="article-tag_list_item">
                <LabelIcon style={styles.tagIcon} color={grey400} viewBox="0 0 24 20" />とりあえず
              </li>
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
            <div className="article-author_profile">
              <div className="article-author_profile_col">
                <Avatar src={`/private-img/${user.avator_img_url}?token=${authorizationToken}`} />
              </div>
              <div className="article-author_profile_col">
                <p>{user.name}</p>
                <date className="article-date">{created_at} 作成</date>
              </div>
            </div>
          </div>
          <div
            className="markdown-body article-body"
            dangerouslySetInnerHTML={{ __html: parseToMarkdown(body) }}
          />
          <div className="article-actions">
            <FlatButton label="削除" onTouchTap={handleConfirmDeleteArticle} />
          </div>
        </Paper>

        <ConfirmDeleteArticleDialog
          open={confirmDeleteDialogOpen}
          handleCancel={handleCancelDelete}
          handleSubmit={() => handleDelete(id)}
        />
      </div>
    );
  }
}

export default ArticleDetail;
