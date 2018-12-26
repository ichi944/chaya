import * as React from 'react';
import { Redirect } from 'react-router-dom';

import withValidator, { WithValidator } from '../services/withValidator';
import Editor from './organisms/Editor';
import { ArticleIsPublishedDialog } from './organisms/Dialogs';
import AttachmentProps from './interfaces/Attachment';

interface Props extends WithValidator {
  match: any;
  history: any;
  heading: string;
  body: string;
  attachments: AttachmentProps[];
  currentChannelId: number;
  currentChannelName: string;
  onPreview: boolean;
  mode: string;
  dirty: {
    heading: boolean;
    body: boolean;
  };
  errors: {
    has: (key: string) => boolean;
    first: (key: string) => boolean;
    heading: boolean;
    body: boolean;
  };
  initialize: (article_id: number) => void;
  handleDrop: (file: any) => void;
  handleDeleteAttachment: (index: number) => void;
  handleCloseDialogDeleteCurrentAttachment: () => void;
  handleDeleteCurrentAttachment: () => void;
  clearEditorContent: () => void;
  confirmDeleteCurrentAttachmentDialogOpen: boolean;
  confirmSuccessDialogOpen: boolean;
  handleSubmit: (
    data: { heading: string; body: string; attachments: AttachmentProps[]; channelId: number },
  ) => void;
  handleClose: () => void;
  handleChange: (e) => void;
  handleTogglePreview: (event: React.FormEvent) => void;
  handleUpdateCursorPosition: (event: React.FormEvent) => void;
  handleDropEmbeddedImage: (accepted: File[], rejected: File[], event: any) => void;
}
class ArticleAdd extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
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
    const { heading, body, attachments, currentChannelId } = this.props;
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
    const { heading, body, attachments, onPreview, mode, confirmSuccessDialogOpen } = this.props;
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
  setData(props: { heading: string; body: string }) {
    const { heading, body } = props;
    return {
      heading,
      body,
    };
  },
})(ArticleAdd);
