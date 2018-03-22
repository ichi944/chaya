import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Editor from './organisms/Editor';
import { ArticleIsPublishedDialog } from './organisms/Dialogs';

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleCancel() {
    const { history, clearEditorContent } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
    const { heading, body, currentChannelId } = this.props;
    this.props.handleSubmit({
      heading,
      body,
      channelId: currentChannelId,
    });
  }
  handleClose() {
    this.props.handleClose();
  }
  render() {
    const { currentChannelId } = this.props;
    if (!currentChannelId) {
      return (
        <Redirect
          to={{
            pathname: '/app/home',
          }}
        />
      );
    }
    const {
      heading, body, onPreview, mode, confirmSuccessDialogOpen,
    } = this.props;
    const { handleChange, handleTogglePreview } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        <Editor
          editorHeaderText={`${this.props.currentChannelName} チャンネルに新しく書く...`}
          heading={heading}
          body={body}
          onPreview={onPreview}
          mode={mode}
          handleChange={handleChange}
          handleSubmit={this.handleSubmit}
          handleSubmitText="公開する"
          handleCancel={this.handleCancel}
          handleCancelText="やめる"
          handleTogglePreview={handleTogglePreview}
        />

        <ArticleIsPublishedDialog open={confirmSuccessDialogOpen} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default ArticleAdd;
