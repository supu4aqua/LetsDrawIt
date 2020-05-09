import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './landing';
//import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  //const renderer = new ShallowRenderer();
ReactDOM.render(<Landing />, div);
ReactDOM.unmountComponentAtNode(div);
});
