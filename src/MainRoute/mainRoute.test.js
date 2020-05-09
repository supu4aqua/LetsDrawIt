import React from 'react';
import ReactDOM from 'react-dom';
import MainRoute from './MainRoute';
//import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  //const renderer = new ShallowRenderer();
ReactDOM.render(<MainRoute />, div);
ReactDOM.unmountComponentAtNode(div);
});
