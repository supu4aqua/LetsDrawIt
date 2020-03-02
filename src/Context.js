import React from 'react';

const Context = React.createContext({
  mainPage: false,
  updatePage: () => {}
});

export default Context;
