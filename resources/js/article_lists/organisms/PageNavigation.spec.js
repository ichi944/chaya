import * as React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { FlatButton } from '@material-ui/core';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Adapter from 'enzyme-adapter-react-16';
import { PageNavigation } from './PageNavigation';

configure({ adapter: new Adapter() });
injectTapEventPlugin();

describe('<PageNavigation />', () => {
  it('renders PageNavigation', () => {
    const props = {
      handleNavigatePage: () => {},
      prev_page_url: 'url',
      next_page_url: 'url',
      query: null,
    };
    const wrapper = shallow(<PageNavigation {...props} />);
    expect(wrapper.find(FlatButton)).to.have.length(2);
  });
  // TODO: Test clicking buttons
});
