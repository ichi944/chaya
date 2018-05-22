// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import AttachmentIcon from 'material-ui-icons/Attachment';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = {
  wrapper: {
    maxWidth: '20rem',
  },
  attachmentItem: {
    paddingLeft: '1rem',
  },
  itemText: {
    paddingLeft: 0,
  },
};
type Props = {
  attachments: Array,
  handleDownloadAttachment: ?Function,
  handleDeleteAttachment: ?Function,
  handleShowDialogDeleteCurrentAttachment: ?Function,
  handleDeleteCurrentAttachment: ?Function,
  classes: Object,
};
const CurrentAttachmentsList = ({
  attachments,
  handleDownloadAttachment = null,
  handleDeleteAttachment = null,
  handleShowDialogDeleteCurrentAttachment = null,
  handleDeleteCurrentAttachment = null,
  classes,
}) => {
  if (handleDownloadAttachment) {
    return (
      <List dense className={classes.wrapper}>
        {attachments.map(f => (
          <ListItem
            className={classes.attachmentItem}
            button
            key={f.id}
            onClick={() => handleDownloadAttachment(f.id, f.name)}
          >
            <ListItemIcon>
              <AttachmentIcon />
            </ListItemIcon>
            <ListItemText primary={f.name} />
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <List dense className={classes.wrapper}>
      {attachments.map(f => (
        <ListItem className={classes.attachmentItem} key={f.id}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary={f.name} />
          {!handleDeleteCurrentAttachment
            ? null
            : <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => handleShowDialogDeleteCurrentAttachment(f)}
              >
                <DeleteIcon />
              </IconButton>
              </ListItemSecondaryAction>}
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(CurrentAttachmentsList);
