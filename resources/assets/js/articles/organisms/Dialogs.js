// @flow
import React from 'react';
import { Dialog, Button, TextField } from 'material-ui';

type ArticleIsPublishedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsPublishedDialog = ({ open, handleClose }: ArticleIsPublishedDialogProps) => {
  const actions = <Button label="OK" primary onTouchTap={handleClose} />;
  return (
    <Dialog
      title="The article is published!"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      New article is saved.
    </Dialog>
  );
};

type ArticleIsUpdatedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsUpdatedDialog = ({ open, handleClose }: ArticleIsUpdatedDialogProps) => {
  const actions = <Button label="OK" primary onTouchTap={handleClose} />;
  return (
    <Dialog
      title="The article is updated!"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      The article is updated successfully.
    </Dialog>
  );
};

type ConfirmDeleteArticleDialogProps = {
  open: boolean,
  handleCancel: Function,
  handleSubmit: Function,
};
export const ConfirmDeleteArticleDialog = ({
  open,
  handleCancel,
  handleSubmit,
}: ConfirmDeleteArticleDialogProps) => {
  const actions = (
    <div>
      <Button label="Cancel" primary onTouchTap={handleCancel} />
      <Button raised label="Yes, delete" primary onTouchTap={handleSubmit} />
    </div>
  );
  return (
    <Dialog
      title="Delete this article?"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleCancel}
    >
      aaa
    </Dialog>
  );
};

type EditDescriptionDialogProps = {
  open: boolean,
  handleChange: Function,
  handleCancel: Function,
  handleSubmit: Function,
  content: ?string,
};
export const EditDescriptionDialog = ({
  open,
  handleChange,
  handleCancel,
  handleSubmit,
  content,
}: EditDescriptionDialogProps) => {
  const actions = (
    <div>
      <Button label="Cancel" primary onTouchTap={handleCancel} />
      <Button raised label="Submit" primary onTouchTap={handleSubmit} />
    </div>
  );
  return (
    <Dialog
      title="Edit channel description"
      actions={actions}
      open={open}
      onRequestClose={handleCancel}
    >
      <TextField
        floatingLabelText="チャンネルの説明"
        hintText=""
        name="content"
        value={content}
        multiLine
        fullWidth
        onChange={handleChange}
      />
    </Dialog>
  );
};
