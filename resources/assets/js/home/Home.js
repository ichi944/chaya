import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Home extends Component {
  state = {
    helloText: '',
  };
  constructor(props) {
    super(props);
    this.handleHello = this.handleHello.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleHello() {
    const text = this.state.helloText;
    this.setState({ helloText: '' });
    this.props.handleHello(text);
  }
  handleChange(e) {
    this.setState({
      helloText: e.target.value,
    });
  }
  render() {
    const { name } = this.props.profile;
    return (
      <Paper className="home-welcome_message_box">
        <h3>Welcome! {name}.</h3>
        Here is Home Screen.<br />
        <br />
        <TextField
          className="home-hello_text_input"
          id="helloText"
          label="enter your message"
          type="text"
          name="helloText"
          value={this.state.helloText}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleHello}>Hello!</Button>
      </Paper>
    );
  }
}

export default Home;
