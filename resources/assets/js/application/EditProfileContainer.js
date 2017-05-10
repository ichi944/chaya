import { connect } from 'react-redux';

import EditProfile from './EditProfile';
import {
  updateProfileForm,
  requestCurrentProfile,
  updateNewImagePreview,
  requestUpdateAvator,
  requestUpdateProfile,
 } from './actions';

const mapStateToProps = ({ profile, editProfile, auth }) => {
  console.log('in EditProfile container');
  return {
    profile,
    editProfile,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeProfileForm() {
      dispatch(requestCurrentProfile());
    },
    handleChangeProfile(e) {
      dispatch(updateProfileForm({
        [e.target.name]: e.target.value,
      }));
    },
    handleUpdateNewImagePreview(reader_result) {
      dispatch(updateProfileForm({ newImageUrl: reader_result }));
    },
    handleUpdateAvator(imageData) {
      dispatch(requestUpdateAvator(imageData));
    },
    handleUpdateProfile() {
      dispatch(requestUpdateProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
