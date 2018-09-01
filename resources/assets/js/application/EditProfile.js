import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import { AvatarEditor } from './organisms/AvatarEditor';
import NotificationSettingContainer from '../notification_setting/NotificationSettingContainer';
import Subheader from './atoms/Subheader';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.reader = new FileReader();

    this.state = {
      file: null,
    };
  }
  componentWillMount() {
    this.props.initializeProfileForm();
  }
  handleSubmitAvatar() {
    console.log('@submit avatar', this.state);
    const imageData = this.state.file;
    this.props.handleUpdateAvatar(imageData);
  }
  handleSubmitProfile() {
    this.props.handleUpdateProfile();
  }
  handleSubmitPassword() {
    console.log('@handleSubmitPasswrd');
    console.log(this.props);
    this.props.handleUpdatePassword();
  }
  handleDrop(files) {
    this.reader.onloadend = () => {
      this.setState({
        file: files[0],
      });
      this.props.handleUpdateNewImagePreview(this.reader.result);
    };
    this.reader.readAsDataURL(files[0]);

    console.log(files);
  }
  render() {
    const {
      name, password, newImageUrl, snackbarIsOpen, snackbarMessage,
    } = this.props.editProfile;
    const { avatar_img_url } = this.props.profile;
    const { authorizationToken } = this.props.auth;
    const { handleChangeProfile, handleChangePassword } = this.props;
    const currentImageUrl = avatar_img_url;
    const currentImageUrlWithToken = `/private-img/${currentImageUrl}?token=${authorizationToken}`;

    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
      backButton: {
        margin: '1rem 0 0 1rem',
      },
    };
    console.log('@render', this.state);
    return (
      <div>
        <Button href="/app/home" style={styles.backButton}>back</Button>
        <Paper className="editor-wrapper" style={styles.paper}>
          <div>
            <Subheader>アバターを変更する...</Subheader>
          </div>

          <div className="editor-forms_inputs">
            <AvatarEditor
              currentImageUrl={currentImageUrlWithToken}
              newImageUrl={newImageUrl}
              onDrop={this.handleDrop}
            />
            <br />
            <Button variant="raised" color="primary" onClick={this.handleSubmitAvatar}>
              Submit
            </Button>
          </div>
        </Paper>

        <Paper className="editor-wrapper" style={styles.paper}>
          <div>
            <Subheader>プロフィールを変更する...</Subheader>
          </div>
          <div className="editor-forms_inputs">
            <TextField label="名前" name="name" value={name} onChange={handleChangeProfile} />
            <br />
            <Button variant="raised" color="primary" onClick={this.handleSubmitProfile}>
              Submit
            </Button>
          </div>
        </Paper>

        <Paper className="editor-wrapper" style={styles.paper}>
          <div>
            <Subheader>パスワードを変更する...</Subheader>
          </div>
          <div className="editor-forms_inputs">
            <TextField
              label="新しいパスワード"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
            <br />
            <Button variant="raised" color="primary" onClick={this.handleSubmitPassword}>
              Submit
            </Button>
          </div>
        </Paper>

        <NotificationSettingContainer />

        <Snackbar open={snackbarIsOpen} message={snackbarMessage} />
      </div>
    );
  }
}

export default EditProfile;
