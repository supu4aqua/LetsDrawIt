import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import NewPainting from "../NewPainting/newPainting";
import ExistingPainting from "../ExistingPainting/existingPainting";
import MainRoute from "../MainRoute/mainRoute";
import Context from "../Context";
import config from "../config";
import ErrorBoundary from "../ErrorBoundary";
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
    this.fetchData("cells"); //Fetch all cells from localhost
    this.fetchData("paintings"); //Fetch all paintings from localhost
  }

  //Checks if it should render landing page or main page with a list of paintings
  //Called from Landing component
  updatePage = () => {
    this.setState({
      isLandingPage: false
    });
  };

  //When a new painting is added/saved, update the state
  //Called from NewPainting component
  addPainting = painting => {
    this.setState({
      paintings: [...this.state.paintings, painting.painting],
      cells: [...this.state.cells, ...painting.cells]
    });
  };

  //When a painting is deleted from main screen, delete the painting based on id and update the state
  //Called from Main component
  deletePainting = paintingId => {
    const newPaintings = this.state.paintings.filter(
      painting => painting.id !== paintingId
    );
    this.setState({
      paintings: newPaintings
    });
  };

  //Filter the cells based on the painting id
  //Called from ExistingPainting component
  setCurrentPainting = id => {
    const cells = this.state.cells
      .filter(cell => {
        return cell.paintingid === id;
      })
      .sort((a, b) => a.position - b.position);
    return cells;
  };

  //Update the state when any color is selected from the palette
  //Called from ExistingPainting component
  handlePaletteSelect = e => {
    this.setState({
      colorClicked: e.currentTarget.className.split(" ")[1]
    });
  };

  //Update the cells in state when painting grid is updated with any color
  //Called from existingPainting component
  handlePaintCell = e => {
    const initialClass = e.currentTarget.className.split(" ")[1];
    e.target.classList.remove(`${initialClass}`);
    //Add selected color to the class
    e.target.classList.add(`${this.state.colorClicked}`);
    e.target.dataset.color = this.state.colorClicked;

    const color = this.state.colorClicked;
    const cellId = e.target.dataset.cellid;
    const cellIndex = this.state.cells.findIndex(painting => {
      return painting.id === parseInt(cellId);
    });
    let updateCell = Object.assign({}, this.state);
    //Update cell.color at position cellIndex
    updateCell.cells[cellIndex].color = color;
    this.setState(updateCell);
  };

  render() {
    const {
      paintings,
      cells,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,
      colorClicked,
      paletteColors,
      isLandingPage
    } = this.state;

    //Set value for context
    const value = {
      paintings,
      cells,
      gridRowCount,
      gridColumnCount,
      paletteRowCount,
      paletteColumnCount,
      colorClicked,
      paletteColors,
      isLandingPage,
      updatePage: this.updatePage,
      addPainting: this.addPainting,
      deletePainting: this.deletePainting,
      setCurrentPainting: this.setCurrentPainting,
      handlePaletteSelect: this.handlePaletteSelect,
      handlePaintCell: this.handlePaintCell
    };

    return (
      <div className="Main">
        <header className="App-header">
          <h1>
            <Link
              to="/"
              style={{
                color: "#3CB371",
                textDecoration: "none"
              }}
            >
              Painting with Pixels{" "}
            </Link>{" "}
          </h1>
        </header>{" "}
        <Context.Provider value={value}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={MainRoute} />{" "}
              <Route exact path="/painting" component={NewPainting} />{" "}
              <Route
                exact
                path="/paintings/:id"
                key="ExistingPainting"
                component={ExistingPainting}
              />
            </ErrorBoundary>{" "}
          </Switch>{" "}
        </Context.Provider>{" "}
      </div>
    );
  }
}

export default App;
