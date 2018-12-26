import * as React from 'react';

import withValidator, { WithValidator } from '../services/withValidator';
import Editor from './organisms/Editor';
import { ArticleIsUpdatedDialog, ConfirmDeleteCurrentAttachmentDialog } from './organisms/Dialogs';
import AttachmentProps from './interfaces/Attachment';
import CurrentAttachmentProps from './interfaces/CurrentAttachment';

interface Props extends WithValidator {
  match: any;
  history: any;
  heading: string;
  body: string;
  current_attachments: CurrentAttachmentProps[];
  attachments: AttachmentProps[];
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
  handleShowDialogDeleteCurrentAttachment: (attachment: CurrentAttachmentProps) => void;
  handleCloseDialogDeleteCurrentAttachment: () => void;
  handleDeleteCurrentAttachment: () => void;
  clearEditorContent: () => void;
  confirmDeleteCurrentAttachmentDialogOpen: boolean;
  confirmSuccessDialogOpen: boolean;
  handleSubmit: (data: { id: number; heading: string; body: string }) => void;
  handleClose: () => void;
  handleChange: (e) => void;
  handleTogglePreview: (event: React.FormEvent) => void;
  handleUpdateCursorPosition: (event: React.FormEvent) => void;
  handleDropEmbeddedImage: (accepted: File[], rejected: File[], event: any) => void;
}
class ArticleEdit extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { initialize, match } = this.props;
    initialize(match.params.id);
  }
  handleDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      this.props.handleDrop(file);
    });
  }
  handleShowDialogDeleteCurrentAttachment(attachment) {
    this.props.handleShowDialogDeleteCurrentAttachment(attachment);
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
      handleDeleteAttachment,
      handleShowDialogDeleteCurrentAttachment,
      handleDeleteCurrentAttachment,
      handleUpdateCursorPosition,
      handleDropEmbeddedImage,
      handleCloseDialogDeleteCurrentAttachment,
      handleClose,
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
          handleDeleteAttachment={handleDeleteAttachment}
          handleShowDialogDeleteCurrentAttachment={handleShowDialogDeleteCurrentAttachment}
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
          handleCancel={handleCloseDialogDeleteCurrentAttachment}
          handleSubmit={handleDeleteCurrentAttachment}
        />
        <ArticleIsUpdatedDialog open={confirmSuccessDialogOpen} handleClose={handleClose} />
      </div>
    );
  }
}

export default withValidator({
  rules: {
    heading: 'required',
    body: 'required',
  },
  setData: (props: { heading: string; body: string }) => {
    const { heading, body } = props;
    return {
      heading,
      body,
    };
  },
})(ArticleEdit);
