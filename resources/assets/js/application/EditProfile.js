import React, { Component } from 'react';
import {
  Subheader,
  Paper,
  FlatButton,
  RaisedButton,
  TextField,
} from 'material-ui';

import { Link } from 'react-router-dom';

import { AvatorEditor } from './organisms/AvatorEditor';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.reader = new FileReader();

    this.state = {
      previewUrl: null,
      file: null,
    }
  }
  componentWillMount() {
    this.props.initializeProfileForm();
  }
  handleSubmitProfile() {
    const imageData = this.state.file;
    this.props.handleUpdateProfile(imageData);
  }
  handleDrop(files) {
    this.reader.onloadend = () => {
      this.setState({
        file: files[0],
        previewUrl: this.reader.result,
      });
    }
    this.reader.readAsDataURL(files[0]);

    console.log(files);
  }
  render() {
    const {
      name,
    } = this.props.editProfile;
    const {
      avatorUrl,
    } = this.props.profile;
    const {
      handleChangeProfile,
    } = this.props;
    const previewUrl = this.state.previewUrl !== null ? this.state.previewUrl : avatorUrl;
    console.log('in EditProfile');

    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
      backButton: {
        margin: '1rem 0 0 1rem',
      },
    };
    console.log("@render", this.state);
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
            <AvatorEditor
              imageUrl={previewUrl}
              onDrop={this.handleDrop}
            />
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
