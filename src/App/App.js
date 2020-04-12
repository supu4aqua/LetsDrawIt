import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Drawing from "../Drawing/drawing";
import MainRoute from "../MainRoute/mainRoute";
import Context from "../Context";
import dummyStore from '../dummy-store';

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
  }

  updatePage = () => {
    this.setState({
      isLandingPage: false
    });
  };

  render() {
    const { paintings, cells, isLandingPage } = this.state;
    //Set value for context
    const value = {
      paintings,
      cells,
      isLandingPage,
      updatePage: this.updatePage
    };
    //console.log(value.mainPage);

    return (
      <div className="Main">
        <Context.Provider value={value}>
          <Switch>
            <Route exact path="/" render={() => <MainRoute />} />
            <Route exact path="/drawing/:id" component={Drawing} />
            <Route render={() => <h2> Page Not Found </h2>} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
