import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
const renderer = new ShallowRenderer();
renderer.render(<Main />, div);
ReactDOM.unmountComponentAtNode(div);
});
