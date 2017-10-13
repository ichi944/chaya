import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import Button from 'material-ui/Button';

class Home extends Component {
  render() {
    const { name } = this.props.profile;
    const { handleHello } = this.props;
    return (
      <Paper className="home-welcome_message_box">
        <h3>Welcome! {name}.</h3>
        Here is Home Screen.<br />
        <br />
        <Link to="/app/articles">記事一覧</Link>
        <br />
        <Button onClick={handleHello}>Hello!</Button>
      </Paper>
    );
  }
}

export default Home;
