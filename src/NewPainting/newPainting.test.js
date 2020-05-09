import React from 'react';
import ReactDOM from 'react-dom';
import NewPainting from './NewPainting';
//import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  //const renderer = new ShallowRenderer();
ReactDOM.render(<NewPainting />, div);
ReactDOM.unmountComponentAtNode(div);
});
