import React, { Component } from 'react';

import withValidator from '../services/withValidator';
import Editor from './organisms/Editor';
import { ArticleIsUpdatedDialog, ConfirmDeleteCurrentAttachmentDialog } from './organisms/Dialogs';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
    this.handleShowDialogDeleteCurrentAttachment = this.handleShowDialogDeleteCurrentAttachment.bind(this);
    this.handleCloseDialogDeleteCurrentAttachment = this.handleCloseDialogDeleteCurrentAttachment.bind(this);
    this.handleDeleteCurrentAttachment = this.handleDeleteCurrentAttachment.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    const { initialize, match } = this.props;
    initialize(match.params.id);
  }
  handleDrop(acceptedFiles) {
    acceptedFiles.forEach((file) => {
      this.props.handleDrop(file);
    });
  }
  handleDeleteAttachment(index) {
    this.props.handleDeleteAttachment(index);
  }
  handleShowDialogDeleteCurrentAttachment(attachment) {
    this.props.handleShowDialogDeleteCurrentAttachment(attachment);
  }
  handleCloseDialogDeleteCurrentAttachment() {
    this.props.handleCloseDialogDeleteCurrentAttachment();
  }
  handleDeleteCurrentAttachment() {
    this.props.handleDeleteCurrentAttachment();
  }
  handleCancel() {
    const { history, clearEditorContent } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
    this.props.makeAllDirty();
    const validation = this.props.makeValidator();
    if (validation.fails()) {
      return;
    }

    const { id } = this.props.match.params;
    const { heading, body } = this.props;
    this.props.handleSubmit({
      id,
      heading,
      body,
    });
  }
  handleClose() {
    this.props.handleClose();
  }
  render() {
    const {
      heading,
      body,
      dirty,
      errors,
      current_attachments,
      attachments,
      onPreview,
      mode,
      confirmDeleteCurrentAttachmentDialogOpen,
      confirmSuccessDialogOpen,
    } = this.props;
    const {
      handleChange,
      handleTogglePreview,
      handleUpdateCursorPosition,
      handleDropEmbeddedImage,
    } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        <Editor
          editorHeaderText="変更する..."
          dirty={dirty}
          errors={errors}
          heading={heading}
          body={body}
          current_attachments={current_attachments}
          attachments={attachments}
          onPreview={onPreview}
          mode={mode}
          handleUpdateCursorPosition={handleUpdateCursorPosition}
          handleDrop={this.handleDrop}
          handleDeleteAttachment={this.handleDeleteAttachment}
          handleShowDialogDeleteCurrentAttachment={this.handleShowDialogDeleteCurrentAttachment}
          handleDeleteCurrentAttachment={this.handleDeleteCurrentAttachment}
          handleChange={handleChange}
          handleSubmit={this.handleSubmit}
          handleSubmitText="更新する"
          handleCancel={this.handleCancel}
          handleCancelText="やめる"
          handleTogglePreview={handleTogglePreview}
          handleDropEmbeddedImage={handleDropEmbeddedImage}
        />

        <ConfirmDeleteCurrentAttachmentDialog
          open={confirmDeleteCurrentAttachmentDialogOpen}
          handleCancel={this.handleCloseDialogDeleteCurrentAttachment}
          handleSubmit={this.handleDeleteCurrentAttachment}
        />
        <ArticleIsUpdatedDialog open={confirmSuccessDialogOpen} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default withValidator({
  rules: {
    heading: 'required',
    body: 'required',
  },
  setData: (props) => {
    const { heading, body } = props;
    return {
      heading,
      body,
    };
  },
})(ArticleEdit);
