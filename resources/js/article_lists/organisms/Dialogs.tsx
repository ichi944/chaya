import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

interface Props {
  open: boolean;
  handleChange: (e) => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  content: string | null;
}

export const EditDescriptionDialog: React.SFC<Props> = ({
  open,
  handleChange,
  handleCancel,
  handleSubmit,
  content,
}) => {
  const uw_content = content === null ? '' : content;
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent>
        <DialogContentText>新しいチャンネルの説明を入力してください。</DialogContentText>
        <TextField
          id="edit_channel_desicription"
          name="content"
          value={uw_content}
          multiline
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
