// @flow
import React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
} from 'material-ui';

type ArticleIsPublishedDialogProps = {
  open: boolean;
  handleClose: Function;
}
export const ArticleIsPublishedDialog = ({
  open,
  handleClose
}: ArticleIsPublishedDialogProps) => {
  const actions = (
    <FlatButton
      label="OK"
      primary
      onTouchTap={handleClose}
    />
  );
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
  open: boolean;
  handleClose: Function;
}
export const ArticleIsUpdatedDialog = ({
  open,
  handleClose,
}: ArticleIsUpdatedDialogProps) => {
  const actions = (
    <FlatButton
      label="OK"
      primary
      onTouchTap={handleClose}
    />
  );
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
  open: boolean;
  handleCancel: Function;
  handleSubmit: Function;
}
export const ConfirmDeleteArticleDialog = ({
  open,
  handleCancel,
  handleSubmit,
}: ConfirmDeleteArticleDialogProps) => {
  const actions = (
    <div>
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleCancel}
      />
      <RaisedButton
        label="Yes, delete"
        primary
        onTouchTap={handleSubmit}
      />
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
}
