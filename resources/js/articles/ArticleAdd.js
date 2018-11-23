import * as React from 'react';
import { Redirect } from 'react-router-dom';

import withValidator from '../services/withValidator';
import Editor from './organisms/Editor';
import { ArticleIsPublishedDialog } from './organisms/Dialogs';

class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDrop(acceptedFiles) {
    acceptedFiles.forEach((file) => {
      this.props.handleDrop(file);
    });
  }
  handleDeleteAttachment(index) {
    console.log('@handleDeleteAttachment', index);
    this.props.handleDeleteAttachment(index);
  }
  handleCancel() {
    const { history, clearEditorContent } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
    const {
      heading, body, attachments, currentChannelId,
    } = this.props;
    this.props.makeAllDirty();
    const validation = this.props.makeValidator();

    if (validation.fails()) {
      return;
    }

    this.props.handleSubmit({
      heading,
      body,
      attachments,
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
      heading, body, attachments, onPreview, mode, confirmSuccessDialogOpen,
    } = this.props;
    const {
      dirty,
      errors,
      handleChange,
      handleTogglePreview,
      handleDropEmbeddedImage,
      handleUpdateCursorPosition,
    } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        <Editor
          editorHeaderText={`${this.props.currentChannelName} チャンネルに新しく書く...`}
          dirty={dirty}
          errors={errors}
          heading={heading}
          body={body}
          attachments={attachments}
          onPreview={onPreview}
          mode={mode}
          handleUpdateCursorPosition={handleUpdateCursorPosition}
          handleChange={handleChange}
          handleDrop={this.handleDrop}
          handleDeleteAttachment={this.handleDeleteAttachment}
          handleSubmit={this.handleSubmit}
          handleSubmitText="公開する"
          handleCancel={this.handleCancel}
          handleCancelText="やめる"
          handleTogglePreview={handleTogglePreview}
          handleDropEmbeddedImage={handleDropEmbeddedImage}
        />

        <ArticleIsPublishedDialog open={confirmSuccessDialogOpen} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default withValidator({
  rules: {
    heading: 'required',
    body: 'required',
  },
  setData(props) {
    const { heading, body } = props;
    return {
      heading,
      body,
    };
  },
})(ArticleAdd);
