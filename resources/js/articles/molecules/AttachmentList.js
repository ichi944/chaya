// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  attachmentItem: {
    padding: '0.6rem 1rem',
  },
  itemText: {
    paddingLeft: 0,
  },
  noItemText: {
    padding: '0.6rem 1rem',
    color: grey[300],
  },
};
type Props = {
  attachments: Array,
  handleDeleteAttachment: ?Function,
  classes: Object,
};
const AttachmentsList = ({
  attachments,
  handleDeleteAttachment = null,
  classes,
  attachments: Props,
}) => {
  if (attachments.length == 0) {
    return <Typography className={classes.noItemText}>無し</Typography>;
  }
  return (
    <List dense className={classes.wrapper}>
      {attachments.map((f, index) => (
        <ListItem className={classes.attachmentItem} key={f.preview}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary={f.name} />
          {!handleDeleteAttachment
            ? null
            : <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => handleDeleteAttachment(index)}>
                <DeleteIcon />
              </IconButton>
              </ListItemSecondaryAction>}
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(AttachmentsList);
