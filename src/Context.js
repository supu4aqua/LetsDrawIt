import React from 'react';

const Context = React.createContext({
  paintings: [],
  cells: [],
  gridRowCount: 3,
  gridColumncount: 3,
  paletteRowCount: 2,
  paletteColumnCount: 5,
  colorClicked: 'black',
  paletteColors: ['black', 'yellow', 'blue', 'orange', 'red', 'brown', 'green', 'pink', 'purple', 'cyan'],
 isLandingPage: true,
});

export default Context;
