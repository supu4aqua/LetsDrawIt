import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Drawing from "../Drawing/drawing";
import MainRoute from "../MainRoute/mainRoute";
import Context from "../Context";

class App extends Component {
  state = {
    mainPage: false
  };

  updatePage = () => {
    this.setState({
    mainPage: true
  });
  }
  render() {
    const { mainPage } = this.state;
    //Set value for context
    const value = {
      mainPage,
      updatePage: this.updatePage,
    };
    console.log(value.mainPage);
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
