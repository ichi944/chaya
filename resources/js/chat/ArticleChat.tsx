import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fade from '@material-ui/core/Fade';
import grey from '@material-ui/core/colors/grey';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { MessageModel, ChatState } from './interfaces/chat';
import { AuthState } from '../auth/interfaces/auth';
import { ArticleDetailState } from '../articles/interfaces/Article';

interface Window {
  Echo: any;
}
declare var window: Window;

const styles = createStyles({
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
});

interface Props extends WithStyles<typeof styles> {
  article: ArticleDetailState;
  auth: AuthState;
  chat: ChatState;
  fetchLatestMessages: (article_id: number) => void;
  newArticleChatPosted: (message: MessageModel) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePressEnter: (e, chat_message: string, article_id: number) => void;
  handleLoadOldMessage: (article_id: number, max_id: number | null) => void;
}
// Can't provide a type argument to the component.
// So I use 'any' instead of 'Props'.
// Probably it related to StyledComponent behavior but I don't know why.
class ArticleChat extends React.Component<any> {
  componentDidMount() {
    const { id } = this.props.article;
    this.props.fetchLatestMessages(id!);
    window.Echo.private('articleChat').listen('ArticleChatPosted', e => {
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
    let max_id: number | null = null;
    if (messages.length > 0) {
      max_id = messages[messages.length - 1].id - 1;
    }
    return (
      <Paper className={classes.wrapper}>
        <TextField
          label="Add Message"
          // tslint:disable-next-line:max-line-length
          helperText="A message is sent when you press Enter. Please press Shift + Enter if you want to add a new line."
          name="message"
          value={chatInput}
          onChange={handleChange}
          onKeyPress={e => {
            handlePressEnter(e, chatInput, id!);
          }}
          multiline
          fullWidth
          margin="normal"
        />
        <List dense>
          {messages.map(message => (
            <Fade in key={message.id} timeout={1000}>
              <ListItem key={message.id} divider>
                <Avatar
                  alt={message.user.name}
                  src={`/private-img/${message.user.avatar_img_url}?token=${authorizationToken}`}
                />
                <ListItemText
                  classes={{
                    primary: classes.message_meta,
                    secondary: classes.message_body,
                  }}
                  primary={`${message.user.name} ${message.created_at}`}
                  secondary={message.body.split('\n').map((item, key) => {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                />
              </ListItem>
            </Fade>
          ))}
        </List>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className={classes.loadOldMessageLink}>
              {show_no_messages_info ? (
                <Typography className={classes.noMessageLabel} variant="subtitle1">
                  no previous message
                </Typography>
              ) : (
                <ButtonBase
                  focusRipple
                  className={classes.loadOldMessageLinkButton}
                  onClick={() => handleLoadOldMessage(id!, max_id)}
                >
                  <Typography variant="subtitle1">Read old messages.</Typography>
                </ButtonBase>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(ArticleChat);
