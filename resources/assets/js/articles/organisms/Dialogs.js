import React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
} from 'material-ui';

export const ArticleIsPublishedDialog = (props) => {
  const {
    open,
    handleClose,
  } = props;
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

export const ArticleIsUpdatedDialog = (props) => {
  const {
    open,
    handleClose,
  } = props;
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

export const ConfirmDeleteArticleDialog = (props) => {
  const {
    open,
    handleCancel,
    handleSubmit,
  } = props;
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
