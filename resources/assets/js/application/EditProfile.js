import React, { Component } from 'react';
import {
  Subheader,
  Paper,
  FlatButton,
  RaisedButton,
  TextField,
} from 'material-ui';
import { Link } from 'react-router-dom';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
  }
  componentWillMount() {
    this.props.initializeProfileForm();
  }
  handleSubmitProfile() {
    this.props.handleUpdateProfile();
  }
  render() {
    const {
      name,
    } = this.props.editProfile;
    const {
      handleChangeProfile,
    } = this.props;
    console.log('in EditProfile');

    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
      backButton: {
        margin: '1rem 0 0 1rem',
      },
    };
    return (
      <div>
        <FlatButton
          style={styles.backButton}
          label="back"
          containerElement={<Link to="/app/home" />}
        />
        <Paper className="editor-wrapper" style={styles.paper}>
          <div style={{ position: 'relative' }}>
            <Subheader>プロフィールを変更する...</Subheader>
          </div>
          <div className="editor-forms_inputs">
            <TextField
              floatingLabelText="名前"
              hintText="Your Name"
              name="name"
              value={name}
              onChange={handleChangeProfile}
            />
            <br />
            <RaisedButton
              label="Submit"
              primary
              onTouchTap={this.handleSubmitProfile}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default EditProfile;
