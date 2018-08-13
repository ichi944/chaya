import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LabelIcon from '@material-ui/icons/Label';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachmentIcon from '@material-ui/icons/Attachment';

import { withStyles } from '@material-ui/core/styles';

import parseToMarkdown from '../services/parseToMarkdown';
import ArticleChatContainer from '../chat/ArticleChatContainer';
import { ConfirmDeleteArticleDialog } from './organisms/Dialogs';
import CurrentAttachmentList from './molecules/CurrentAttachmentList';

const styles = {
  button: {
    position: 'fixed',
    right: '2rem',
    bottom: '2.7rem',
  },
  backButton: {
    margin: '1rem 0 0 1rem',
  },
  pin: {
    fontSize: '12px',
  },
  pinIconStyle: {
    width: '14px',
    marginRight: '6px',
  },
};

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
      current_attachments,
      user,
      created_at,
      pinned,
      confirmDeleteDialogOpen,
    } = this.props.article;
    const { classes } = this.props;
    const { authorizationToken } = this.props.auth;
    const {
      handleConfirmDeleteArticle,
      handleCancelDelete,
      handleDelete,
      handleDownloadAttachment,
    } = this.props;
    const body_with_token = body.replace(
      /(\!\[.*\])(\(.*\.png|.*\.jpg)/,
      `$1$2?token=${authorizationToken}`,
    );
    if (!id) {
      return <div />;
    }
    console.log('@article detail', pinned);
    return (
      <div>
        <Button className={classes.backButton} onTouchTap={this.goBack}>Back</Button>
        <Paper className="article-wrapper">
          <div className="article-header">
            <h2>{heading}</h2>
            <div>
              <FormControlLabel
                control={<Checkbox label="pin" checked={pinned} onChange={this.onCheckPin} />}
                label="pin"
              />
            </div>
          </div>
          <Divider />
          <div className="article-meta">
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
            dangerouslySetInnerHTML={{ __html: parseToMarkdown(body_with_token) }}
          />

          <CurrentAttachmentList
            attachments={current_attachments}
            handleDownloadAttachment={handleDownloadAttachment}
          />

          <Divider />
          <div className="article-actions">
            <Button onClick={handleConfirmDeleteArticle}>削除</Button>
          </div>
        </Paper>

        <ArticleChatContainer />

        <Button
          variant="fab"
          href={`/app/articles/${id}/edit`}
          color="primary"
          aria-label="edit"
          className={classes.button}
        >
          <ModeEditIcon />
        </Button>

        <ConfirmDeleteArticleDialog
          open={confirmDeleteDialogOpen}
          handleCancel={handleCancelDelete}
          handleSubmit={() => handleDelete(id)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ArticleDetail);
