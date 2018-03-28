import React, { Component } from 'react';
import { Paper, Divider, TextField, Button } from 'material-ui';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
  wrapper: {
    padding: '1rem',
    margin: '1rem',
  },
};

class ArticleChat extends Component {
  render() {
    const { handleChange, handlePressEnter } = this.props;
    const { chatInput } = this.props.chat;
    const { id } = this.props.article;
    const { classes } = this.props;
    return (
      <Paper className={classes.wrapper}>
        <TextField
          label="Message"
          name="message"
          value={chatInput}
          onChange={handleChange}
          onKeyPress={(e) => {
            handlePressEnter(e, chatInput, id);
          }}
          multiline
          fullWidth
          margin="normal"
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(ArticleChat);
