import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <h3>Welcome! {name}.</h3>
        Here is Home Screen.<br />
        <br />
        <Link to="/app/articles">記事一覧</Link>
      </Paper>
    );
  }
}

export default Home;
