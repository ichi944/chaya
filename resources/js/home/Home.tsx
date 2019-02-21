import React, { FunctionComponent, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { sayHello } from './actions';
import { RootState } from '../interfaces/rootState';
import { HomeActions } from './interfaces/home';
import { ProfileState } from '../application/interfaces/profile';

interface Props {
  handleHello: (text: string) => void;
  profile: ProfileState;
}

const Home: FunctionComponent<Props> = props => {
  const [helloText, updateHelloText] = useState('');
  const { handleHello, profile } = props;
  return (
    <Paper className="home-welcome_message_box">
      <h3>Welcome! {profile.name}.</h3>
      Here is Home Screen.
      <br />
      <br />
      <TextField
        className="home-hello_text_input"
        id="helloText"
        label="enter your message"
        type="text"
        name="helloText"
        value={helloText}
        onChange={e => updateHelloText(e.currentTarget.value)}
      />
      <Button
        onClick={() => {
          handleHello(helloText);
          updateHelloText('');
        }}
      >
        Hello!
      </Button>
    </Paper>
  );
};

const mapStateToProps = ({ profile }: RootState) => ({ profile });

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, HomeActions>) => ({
  handleHello: (text: string) => {
    dispatch(sayHello(text));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
