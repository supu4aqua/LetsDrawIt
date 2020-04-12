import React from 'react';

const Context = React.createContext({
  paintings: [],
  cells: [],
  isLandingPage: true,
  updatePage: () => {}
});

export default Context;
