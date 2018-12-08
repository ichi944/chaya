import { connect } from 'react-redux';

import EditProfile from './EditProfile';
import {
  clearProfileForm,
  updateProfileForm,
  requestCurrentProfile,
  requestUpdateAvatar,
  requestUpdateProfile,
  updatePasswordForm,
  requestUpdatePassword,
  closeNotification,
} from './actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ profile, editProfile, auth }: RootState) => {
  console.log('in EditProfile container');
  return {
    profile,
    editProfile,
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeProfileForm() {
      dispatch(clearProfileForm());
      dispatch(requestCurrentProfile());
    },
    handleChangeProfile(e) {
      dispatch(
        updateProfileForm({
          [e.target.name]: e.target.value,
        }),
      );
      dispatch(closeNotification());
    },
    handleUpdateNewImagePreview(reader_result) {
      dispatch(updateProfileForm({ newImageUrl: reader_result }));
    },
    handleUpdateAvatar(imageData) {
      dispatch(requestUpdateAvatar(imageData));
    },
    handleUpdateProfile() {
      dispatch(requestUpdateProfile());
    },
    handleChangePassword(e) {
      dispatch(updatePasswordForm(e.target.value));
      dispatch(closeNotification());
    },
    handleUpdatePassword() {
      dispatch(requestUpdatePassword());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
