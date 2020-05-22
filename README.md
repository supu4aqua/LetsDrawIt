  # Painting With Pixels

  Where users can color the pixels and create a painting on 3x3 grid

  **[Live link](hhttps://painting-with-pixels-app.mesupi.now.sh/)**
  
  ![Travis Status](https://img.shields.io/travis/supu4aqua/painting-with-pixels-app)]
  
  This repo contains the client-side React app. Looking for the back-end Painting-With-Pixels API? **[Click Here](https://github.com/supu4aqua/painting-with-pixels-api.git)**

## Introduction
User can create or view any existing painting. Color can be selected from a palette of 10 colors.
Each painting have 9 cells represting one of the colors of the grid.

## Screen Captures
#### Landing Page and Start Painting:
![Landing Page and Start Painting](https://gyazo.com/ca9ea957d92689ab7250a572a741e5bd.gif)

#### Home Page listing all existing paintings:
![Home Page](https://gyazo.com/c56b9aba1fbfa9b94986321e3317bc0a.gif)

#### New Painting:
![New Painting](https://gyazo.com/c1b92c23a8f51253b33e0b0cf1feeead.gif)

#### Edit existing Painting: 
![Edit a Form](https://gyazo.com/3df743fa7d773795aef96d96f467d45f.gif)


## Technology

### Front End
* [React](https://reactjs.org/)
    * [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
    * [React Router](https://reacttraining.com/react-router/)
* HTML5
* CSS3
    * [CSS Modules](https://github.com/css-modules/css-modules)

### Testing
* [Jest](https://jestjs.io/en/)

### Production
* [Heroku](https://www.heroku.com/) Cloud Application Platform

## Install and run locally
*** NOTE: The client makes AJAX calls to the [Painting With Pixels API](https://github.com/supu4aqua/painting-with-pixels-api.git), which should also be running in your development environment

* Clone this repository:
    * `git clone https://github.com/supu4aqua/painting-with-pixels-app.git`
* Move into folder:
    * `cd painting-with-pixels-app/`
* Run `npm install`
* Run `npm start`
* In browser, navigate to `localhost:3000` or your specified port
  
* To test, run `npm test`


## Future Features
* Increase the grid-size to 6x6 or even larger
* Add custom colors manually
* Add users accounts/make it multi-user
* Dashboard for each user
* Undo-Redo a painting
* User rating for a painting
