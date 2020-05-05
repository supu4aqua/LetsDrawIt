import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import NewPainting from "../NewPainting/newPainting";
import ExistingPainting from "../ExistingPainting/existingPainting";
import MainRoute from "../MainRoute/mainRoute";
import Context from "../Context";
import config from '../config';
import "./App.css";

class App extends Component {
  state = {
    paintings: [],
    cells: [],
    gridRowCount: 3,
    gridColumnCount: 3,
    paletteRowCount: 2,
    paletteColumnCount: 5,

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
  //  const url = `http://localhost:8000/api/${stateData}`;
    const url = config.API_URL + `/api/${stateData}`;
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
    console.log("Component mount app");
    this.fetchData("cells"); //Fetch all cells from localhost
    this.fetchData("paintings"); //Fetch all paintings from localhost
  }

  updatePage = () => {
    this.setState({
      isLandingPage: false
    });
  };

  addPainting = painting => {
    this.setState({
      paintings: [...this.state.paintings, painting.painting],
      cells: [...this.state.cells, ...painting.cells]
    });
  };

  deletePainting = paintingId => {
    const newPaintings = this.state.paintings.filter(
      painting => painting.id !== paintingId
    );
    this.setState({
      paintings: newPaintings
    });
  };

  updatePainting = cells => {
    console.log("Update Painting");
  };

  render() {
    const {
      paintings,
      cells,
    //  newPainting,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,

      colorClicked,
      paletteColors,
      //newPaintingId,
      isLandingPage
    } = this.state;
    //Set value for context
    const value = {
      paintings,
      cells,
    //  newPainting,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,

      colorClicked,
      paletteColors,
      isLandingPage,
    //  newPaintingId,
      updatePage: this.updatePage,
      addPainting: this.addPainting,
      //createPainting: this.createPainting,
      deletePainting: this.deletePainting,
      updatePainting: this.updatePainting,

    };
     console.log("Render app");


    return (
      <div className="Main">
        <header className="App-header">
          <h1>
            <Link to="/" style={{ color: "#3CB371", textDecoration: "none" }}>
              Painting with Pixels
            </Link>{" "}
          </h1>

        </header>
        <Context.Provider value={value}>
          <Switch>
            <Route exact path="/" component={MainRoute} />
            <Route exact path="/painting" component={NewPainting} />
            <Route exact path="/paintings/:id" key="ExistingPainting" component={ExistingPainting} />
            <Route render={() => <h2> Page Not Found </h2>} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
