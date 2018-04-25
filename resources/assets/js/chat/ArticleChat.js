import React, { Component } from 'react';
import { Paper, Divider, TextField, Button, Avatar } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
  wrapper: {
    padding: '1rem',
    margin: '1rem',
  },
};

class ArticleChat extends Component {
  componentDidMount() {
    const { id } = this.props.article;
    this.props.fetchLatestMessages(id);
    window.Echo.private('articleChat').listen('ArticleChatPosted', (e) => {
      console.log('@ArticleChat', e.message);
      this.props.newArticleChatPosted(e.message.chat_message);
    });
  }
  componentWillUnmount() {
    window.Echo.leave('articleChat');
  }
  render() {
    const { handleChange, handlePressEnter } = this.props;
    const { authorizationToken } = this.props.auth;
    const { messages, chatInput } = this.props.chat;
    const { id } = this.props.article;
    const { classes } = this.props;
    return (
      <Paper className={classes.wrapper}>
        <List dense>
          {messages.map(message => (
            <ListItem key={message.id} divider>
              <Avatar
                alt={message.user.name}
                src={`/private-img/${message.user.avator_img_url}?token=${authorizationToken}`}
              />
              <ListItemText
                primary={`${message.user.name} ${message.created_at}`}
                secondary={message.body.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br /></span>;
                })}
              />
            </ListItem>
          ))}
        </List>
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
