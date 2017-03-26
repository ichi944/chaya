import React from 'react';
import {
  Dialog,
  FlatButton,
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
}
