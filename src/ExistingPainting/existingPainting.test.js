import React from 'react';
import ReactDOM from 'react-dom';
import ExistingPainting from './existingPainting';
//import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  //const renderer = new ShallowRenderer();
ReactDOM.render(<ExistingPainting />, div);
ReactDOM.unmountComponentAtNode(div);
});
