import React, { Component } from 'react';
import { Paper, FlatButton, TextField } from '@material-ui/core';

class Searcher extends Component {
  render() {
    const { query } = this.props;
    const { handleChange, handleSubmit, handlePressEnter } = this.props;
    return (
      <Paper className="searcher-wrapper">
        <div className="searcher-input_wrapper">
          <TextField
            id="searcher-query"
            name="query"
            hintText="検索..."
            value={query}
            fullWidth
            onChange={handleChange}
            onKeyPress={handlePressEnter}
          />
        </div>
        <div className="searcher-submit_button">
          <FlatButton label="検索する" primary onClick={() => handleSubmit(query)} />
        </div>
      </Paper>
    );
  }
}

export default Searcher;
