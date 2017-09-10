// @flow
import React from 'react';

import Button from 'material-ui/Button';

type Props = {
  handleNavigatePage: Function,
  prev_page_url: string,
  next_page_url: string,
  query: ?string,
};
export const PageNavigation = ({
  handleNavigatePage,
  prev_page_url,
  next_page_url,
  query = null,
}: Props) => {
  const handleGoPrevPage: Function = prev_page_url
    ? () => handleNavigatePage(prev_page_url, query)
    : () => {};
  const handleGoNextPage: Function = next_page_url
    ? () => handleNavigatePage(next_page_url, query)
    : () => {};
  return (
    <div className="article_index-page_navi">
      <Button onTouchTap={handleGoPrevPage} disabled={prev_page_url === null}>prev</Button>
      <Button onTouchTap={handleGoNextPage} disabled={next_page_url === null}>next</Button>
    </div>
  );
};
