import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import NewPainting from "../NewPainting/newPainting";
import Painting from "../Painting/painting";
import MainRoute from "../MainRoute/mainRoute";
//import Main from "../Main/main";
import Context from "../Context";
//import config from "../config";
//import dummyStore from "../dummy-store";

class App extends Component {
  state = {
    paintings: [],
    cells: [],
    gridRowCount: 3,
    gridColumnCount: 3,
    paletteRowCount: 5,
    paletteColumnCount: 2,
  /*  currentPainting: {
      1: { position: 1, color: "white" },
      2: { position: 2, color: "white" },
      3: { position: 3, color: "white" },
      4: { position: 4, color: "white" },
      5: { position: 5, color: "white" },
      6: { position: 6, color: "white" },
      7: { position: 7, color: "white" },
      8: { position: 8, color: "white" },
      9: { position: 9, color: "white" }
    },*/
    /*currentPainting: {
        "cells": [
            { position: 1, color: "white" },
            { position: 2, color: "white" },
            { position: 3, color: "white" },
            { position: 4, color: "white" },
            { position: 5, color: "white" },
            { position: 6, color: "white" },
            { position: 7, color: "white" },
            { position: 8, color: "white" },
            { position: 9, color: "white" }
          ]
      }*/
    //newPaintingId: "",
    colorClicked: "white",
    paletteColors: [
      "black",
      "yellow",
      "blue",
      "orange",
      "red",
      "brown",
      "green",
      "pink",
      "purple",
      "cyan"
    ],
    isLandingPage: true
  };

  //To fetch data from local host - {stateData} will either be 'cells' or 'paintings'
  fetchData(stateData) {
    const url = `http://localhost:8000/api/${stateData}`;
    //const url = config.API_URL + `/api/${stateData}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          [stateData]: data
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    //this.setState(dummyStore);
    this.fetchData("cells"); //Fetch all cells from localhost
    this.fetchData("paintings"); //Fetch all paintings from localhost
  }

  updatePage = () => {
    this.setState({
      isLandingPage: false
    });
  };

  addPainting = painting => {
    //console.log(painting.id);
    this.setState({
      paintings: [...this.state.paintings, painting],
      newPaintingId: painting.id
    });
  };

/*  createPainting = (position, color) => {

    this.setState({
      newPainting: [
        ...this.state.newPainting,
        {
          position: position,
          color: color
        }
      ]
    });
  };*/

  deletePainting = paintingId => {
    const newPaintings = this.state.paintings.filter(
      painting => painting.id !== paintingId
    );
    this.setState({
      paintings: newPaintings
    });
  };

  render() {
    const {
      paintings,
      cells,
      newPainting,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,
      colorClicked,
      paletteColors,
      newPaintingId,
      isLandingPage
    } = this.state;
    //Set value for context
    const value = {
      paintings,
      cells,
      newPainting,
      isLandingPage,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,
      colorClicked,
      paletteColors,
      newPaintingId,
      updatePage: this.updatePage,
      addPainting: this.addPainting,
      createPainting: this.createPainting,
      deletePainting: this.deletePainting
    };
    //console.log(value.paintings);

    return (
      <div className="Main">
        <header className="App__header">
          <h1>
            <Link to="/" style={{ color: "#FF4500", textDecoration: "none" }}>
              Painting with Pixels
            </Link>{" "}
          </h1>
          <h2>Color the blocks and create a painting!! </h2>
        </header>
        <Context.Provider value={value}>
          <Switch>
            <Route exact path="/" component={MainRoute} />
            <Route exact path="/painting" component={NewPainting} />
            <Route exact path="/painting/:id" component={Painting} />
            <Route render={() => <h2> Page Not Found </h2>} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
