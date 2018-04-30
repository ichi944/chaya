import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { Paper, Divider, TextField, Button, Avatar } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { FormControlLabel } from 'material-ui/Form';
import Fade from 'material-ui/transitions/Fade';
import grey from 'material-ui/colors/grey';
import { withStyles } from 'material-ui/styles';

const styles = {
  wrapper: {
    padding: '1rem',
    margin: '1rem',
  },
  loadOldMessageLink: {
    textAlign: 'center',
  },
  noMessageLabel: {
    opacity: 0.5,
    padding: '0 1rem',
  },
  loadOldMessageLinkButton: {
    width: '100%',
    padding: '0 1rem',
    '&:hover': {
      opacity: 0.5,
    },
  },
  message_meta: {
    color: grey[500],
  },
  message_body: {
    color: grey[900],
  },
};

class ArticleChat extends Component {
  componentDidMount() {
    const { id } = this.props.article;
    this.props.fetchLatestMessages(id);
    window.Echo.private('articleChat').listen('ArticleChatPosted', (e) => {
      console.log('@ArticleChat', e.message);
      if (e.message.chat_message.article_id === id) {
        this.props.newArticleChatPosted(e.message.chat_message);
      }
    });
  }
  componentWillUnmount() {
    window.Echo.leave('articleChat');
  }
  render() {
    const { handleChange, handlePressEnter, handleLoadOldMessage } = this.props;
    const { authorizationToken } = this.props.auth;
    const { messages, chatInput, show_no_messages_info } = this.props.chat;
    const { id } = this.props.article;
    const { classes } = this.props;
    let max_id = null;
    if (messages.length > 0) {
      max_id = messages[0].id - 1;
    }
    return (
      <Paper className={classes.wrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className={classes.loadOldMessageLink}>
              {show_no_messages_info
                ? <Typography className={classes.noMessageLabel}>no previous message</Typography>
                : <ButtonBase
                  focusRipple
                  className={classes.loadOldMessageLinkButton}
                  onClick={() => handleLoadOldMessage(id, max_id)}
                >
                  <Typography>Read old messages.</Typography>
                  </ButtonBase>}
            </div>
          </Grid>
        </Grid>
        <List dense>
          {messages.map(message => (
            <Fade in key={message.id} timeout={1000}>
              <ListItem key={message.id} divider>
                <Avatar
                  alt={message.user.name}
                  src={`/private-img/${message.user.avator_img_url}?token=${authorizationToken}`}
                />
                <ListItemText
                  classes={{
                    primary: classes.message_meta,
                    secondary: classes.message_body,
                  }}
                  primary={`${message.user.name} ${message.created_at}`}
                  secondary={message.body.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>;
                  })}
                />
              </ListItem>
            </Fade>
          ))}
        </List>
        <TextField
          label="Add Message"
          helperText="A message is sent when you press Enter. Please press Shift + Enter if you want to add a new line."
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
