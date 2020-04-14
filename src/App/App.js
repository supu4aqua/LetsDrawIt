import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
//import NewPainting from "../NewPainting/newPainting";
import Painting from "../Painting/painting";
import MainRoute from "../MainRoute/mainRoute";
import Context from "../Context";
import config from "../config";
import dummyStore from "../dummy-store";

class App extends Component {
  state = {
    paintings: [],
    cells: [],
    newPainting: {},
    isLandingPage: true
  };

  /*fetchDrawings(stateData) {
    const url = `http://localhost:9090/${stateData}`;
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
        console.log('Fetch Drawings');
        console.log(dummyStore.cells);
    }*/

  componentDidMount() {
    //this.fetchDrawings();
    this.setState(dummyStore);
  }

  updatePage = () => {
    this.setState({
      isLandingPage: false
    });
  };

  deletePainting = paintingId => {
    /*  const newNotes = this.state.notes.filter(note => note.id !== noteId);
      this.setState({
        notes: newNotes
      });*/
    console.log("Delete Painting");
  };

  render() {
    const { paintings, cells, isLandingPage } = this.state;
    //Set value for context
    const value = {
      paintings,
      cells,
      isLandingPage,
      updatePage: this.updatePage,
      deletePainting: this.deletePainting
    };
    console.log(value.paintings);

    return (
      <div className="Main">
        <header className="App__header">
          <h1>
            <Link to="/" style={{ color: "#FF4500", textDecoration: "none" }}>
              Painting with Pixels
            </Link>{" "}
          </h1>
        </header>
        <Context.Provider value={value}>
          <Switch>
            // <Route exact path="/" render={() => <MainRoute />} />
            <Route exact path="/" component={MainRoute} />
            <Route exact path="/painting" component={Painting} />
            <Route exact path="/painting/:id" component={Painting} />
            <Route render={() => <h2> Page Not Found </h2>} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
