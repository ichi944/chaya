import React from 'react';

import {
  FlatButton,
} from 'material-ui';

export const PageNavigation = (props) => {
  const {
    handleNavigatePage,
    prev_page_url,
    next_page_url,
    query,
  } = props;
  return (
    <div className="article_index-page_navi">
      <FlatButton
        label="prev"
        onTouchTap={() => handleNavigatePage(prev_page_url, query)}
        disabled={prev_page_url === null}
      />
      <FlatButton
        label="next"
        onTouchTap={() => handleNavigatePage(next_page_url, query)}
        disabled={next_page_url === null}
      />
    </div>
  );
};
