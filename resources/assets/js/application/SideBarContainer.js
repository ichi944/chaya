import { connect } from 'react-redux';

import SideBar from './SideBar';

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(mapStateToProps)(SideBar);
