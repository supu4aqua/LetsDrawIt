import React from 'react';

const Context = React.createContext({
  paintings: [],
  cells: [],
  //newPainting: [],
  gridRowCount: 3,
  gridColumncount: 3,
  paletteRowCount: 2,
  paletteColumnCount: 5,
  //currentPainting: [],
  //newPaintingId: '',
  colorClicked: 'black',
  paletteColors: ['black', 'yellow', 'blue', 'orange', 'red', 'brown', 'green', 'pink', 'purple', 'cyan'],
 isLandingPage: true,
});

export default Context;
