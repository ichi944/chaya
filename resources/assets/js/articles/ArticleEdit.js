import React, { Component } from 'react';

import Editor from './organisms/Editor';
import {
  ArticleIsPublishedDialog,
} from './organisms/Dialogs';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    const {
      initialize,
      match,
    } = this.props;
    initialize(match.params.id);
  }
  handleCancel() {
    const {
      history,
      clearEditorContent,
    } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
    const {
      heading,
      body,
    } = this.props;
    this.props.handleSubmit({
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
      onPreview,
      mode,
      confirmSuccessDialogOpen,
    } = this.props;
    const {
      handleChange,
      handleTogglePreview,
    } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        <Editor
          editorHeaderText="変更する..."
          heading={heading}
          body={body}
          onPreview={onPreview}
          mode={mode}
          handleChange={handleChange}
          handleSubmit={this.handleSubmit}
          handleSubmitText="更新する"
          handleCancel={this.handleCancel}
          handleCancelText="やめる"
          handleTogglePreview={handleTogglePreview}
        />

        <ArticleIsPublishedDialog
          open={confirmSuccessDialogOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default ArticleEdit;
