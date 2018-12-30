import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ProfileState } from '../application/interfaces/profile';

interface Props {
  handleHello: (text) => void;
  profile: ProfileState;
}
interface State {
  helloText: string;
}
class Home extends React.Component<Props, State> {
  state = {
    helloText: '',
  };
  constructor(props: Props) {
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
        Here is Home Screen.
        <br />
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