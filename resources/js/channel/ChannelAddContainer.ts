import { connect } from 'react-redux';

import ChannelAdd from './ChannelAdd';

import { updateChannelAddForm, validateChannelAdd } from './actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ channelAdd }: RootState) => {
  return {
    channelAdd,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(e) {
      dispatch(updateChannelAddForm(e.target.name, e.target.value));
    },
    handleSubmit() {
      dispatch(validateChannelAdd());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelAdd);
