import { connect } from 'react-redux';

import Searcher from './Searcher';

import {
  updateSearchQuery,
  requestSearch,
 } from './actions';

const mapStateToProps = ({ searcher }) => {
  return {
    ...searcher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch(updateSearchQuery(e.target.value));
    },
    handleSubmit(query) {
      dispatch(requestSearch(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
