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
    this.handleSubmitAvator = this.handleSubmitAvator.bind(this);
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.reader = new FileReader();

    this.state = {
      currentImageUrl: null,
      newImageUrl: null,
      file: null,
    }
  }
  componentWillMount() {
    this.props.initializeProfileForm();
  }
  handleSubmitAvator() {
    console.log('@submit avatoa', this.state);
    const imageData = this.state.file;
    this.props.handleUpdateAvator(imageData);
  }
  handleSubmitProfile() {
    this.props.handleUpdateProfile();
  }
  handleDrop(files) {
    this.reader.onloadend = () => {
      this.setState({
        file: files[0],
        newImageUrl: this.reader.result,
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
      avator_img_url,
    } = this.props.profile;
    const {
      authorizationToken,
    } = this.props.auth;
    const {
      handleChangeProfile,
    } = this.props;
    const currentImageUrl = avator_img_url;
    const currentImageUrlWithToken = `/private-img/${currentImageUrl}?token=${authorizationToken}`

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
            <Subheader>アバターを変更する...</Subheader>
          </div>

          <div className="editor-forms_inputs">
            <AvatorEditor
              currentImageUrl={currentImageUrlWithToken}
              newImageUrl={this.state.newImageUrl}
              onDrop={this.handleDrop}
            />
            <br />
            <RaisedButton
              label="Submit"
              primary
              onTouchTap={this.handleSubmitAvator}
            />
          </div>


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
