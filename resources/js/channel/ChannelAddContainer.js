import { connect } from 'react-redux';

import ChannelAdd from './ChannelAdd';

import { updateChannelAddForm, validateChannelAdd } from './actions';

const mapStateToProps = ({ channelAdd }) => {
  return {
    channelAdd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch(updateChannelAddForm(e.target.name, e.target.value));
    },
    handleSubmit() {
      dispatch(validateChannelAdd());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAdd);
