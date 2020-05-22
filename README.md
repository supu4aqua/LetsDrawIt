  # Painting With Pixels

  Where users can color the pixels and create a painting on 3x3 grid

  ### **_[Live link](https://afternoon-citadel-97734.herokuapp.com/)_**
  
  [![Build Status](https://travis-ci.org/supu4aqua/painting-with-pixels-app.png?branch=master)](https://travis-ci.org/supu4aqua/painting-with-pixels-app)
  
  This repo contains the client-side React app. Looking for the back-end Painting-With-Pixels API? **[Click Here](https://github.com/supu4aqua/painting-with-pixels-api.git)**

## Introduction
User can create or view any existing painting. Color can be selected from a palette of 10 colors.
Each painting have 9 cells represting one of the colors of the grid.

## Screen Captures
#### Landing Page and Start Painting:
![Landing Page and Start Painting](https://i.gyazo.com/265cdf6a3c99454028504bc538b0d8bc.gif)

#### Home Page listing all existing paintings:
![Review Feedback](https://i.gyazo.com/8c6f674f972021d5741ac36926969d9a.gif)

#### New Painting:
![New Painting](https://i.gyazo.com/09061dfeb25504f2a838ec89854bbab0.gif)

#### Edit existing Painting: 
![Edit a Form](https://i.gyazo.com/547804b2afd42d6b585ded5f10ff6f7d.gif)


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
