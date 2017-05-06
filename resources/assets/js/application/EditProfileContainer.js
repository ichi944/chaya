import { connect } from 'react-redux';
import * as types from './actionTypes';

import EditProfile from './EditProfile';
import {
  updateProfileForm,
  requestCurrentProfile,
  requestUpdateProfile,
 } from './actions';

const mapStateToProps = ({ profile, editProfile }) => {
  console.log('in EditProfile container');
  return {
    profile,
    editProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeProfileForm() {
      dispatch(requestCurrentProfile())
    },
    handleChangeProfile(e) {
      const name = e.target.name;
      dispatch(updateProfileForm({
        [e.target.name]: e.target.value,
      }))
    },
    handleUpdateProfile(imageData) {
      dispatch(requestUpdateProfile(imageData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
