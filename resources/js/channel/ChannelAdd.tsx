import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Subheader from '../application/atoms/Subheader';
import { ChannelAddState } from './interfaces/channel';

const styles = createStyles({
  wrapper: {
    margin: '1rem',
  },
  backButton: {
    margin: '1rem 0 0 1rem',
  },
  header: {
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: '1rem',
  },
  fieldsContainer: {
    maxWidth: '20rem',
  },
  description: {
    fontSize: '.8rem',
  },
  errorMessage: {
    fontSize: '.8rem',
    color: red[500],
  },
});

interface Props {
  history: any;
  channelAdd: ChannelAddState;
  handleChange: () => void;
  handleSubmit: () => void;
  classes: {
    wrapper: string;
    backButton: string;
    header: string;
    content: string;
    fieldsContainer: string;
    description: string;
    errorMessage: string;
  };
}
class ChannelAdd extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { classes } = this.props;
    const { name, description, nameValid, nameErrorMessage } = this.props.channelAdd;
    const { handleChange, handleSubmit } = this.props;
    return (
      <div>
        <Button className={classes.backButton} onClick={this.goBack}>
          Back
        </Button>

        <Paper className={classes.wrapper}>
          <div className={classes.header}>
            <Subheader title="新しいチャンネルを作成する..." />
          </div>
          <Divider />
          <div className={classes.content}>
            <div className={classes.description}>
              チャンネル名を入力して「作成」ボタンを押してください。
              <br />
              説明は任意で入力してください。
            </div>
            <div className={classes.fieldsContainer}>
              <TextField
                label="チャンネル名"
                name="name"
                value={name}
                onChange={handleChange}
                error={!nameValid}
                fullWidth
                margin="dense"
                autoFocus
                helperText={nameValid ? '20文字以内' : nameErrorMessage}
              />
              <br />

              <TextField
                label="説明(任意)"
                name="description"
                value={description}
                onChange={handleChange}
                fullWidth
                multiline
                margin="dense"
                helperText="複数行の入力も可能です。"
              />
              <br />
            </div>
            <div className="editor-actions">
              <Button color="primary" onClick={handleSubmit}>
                作成
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ChannelAdd);
