import React, { Component } from 'react';

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
  componentDidMount() {
    const { initialize, match } = this.props;
    initialize(match.params.id);
  }
  handleCancel() {
    const { history, clearEditorContent } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
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
      current_attachments,
      attachments,
      onPreview,
      mode,
      confirmDeleteCurrentAttachmentDialogOpen,
      confirmSuccessDialogOpen,
    } = this.props;
    const { handleChange, handleTogglePreview } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        <Editor
          editorHeaderText="変更する..."
          heading={heading}
          body={body}
          current_attachments={current_attachments}
          attachments={attachments}
          onPreview={onPreview}
          mode={mode}
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

export default ArticleEdit;
