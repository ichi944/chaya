import React, { Component } from 'react';
import {
  Paper,
} from 'material-ui';

class Home extends Component {
  render() {
    const {
      name,
    } = this.props.profile;
    return (
      <Paper className="home-welcome_message_box">
        Hello! {name}.
      </Paper>
    );
  }
}

export default Home;
