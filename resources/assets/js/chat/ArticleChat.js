import React, { Component } from 'react';
import { Paper, Divider, TextField, Button } from 'material-ui';
import { FormControlLabel } from 'material-ui/Form';

class ArticleChat extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log('@ArticleChat handleChange', e.value);
    this.props.handleChange(e.value);
  }
  render() {
    console.log('@ArticleChat', this.props.article);
    const { chatInput } = this.props.chat;
    return (
      <Paper>
        <TextField
          label="Message"
          name="message"
          value={chatInput}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
      </Paper>
    );
  }
}

export default ArticleChat;
