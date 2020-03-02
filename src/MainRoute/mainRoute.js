import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./mainRoute.css";
import Context from "../Context";

class MainRoute extends Component {
  static contextType = Context;

  render() {
    console.log("In Main Route", this.context.mainPage);
    const displayPage = this.context.mainPage ? (
      <h1>MainPage</h1>
    ) : (
      <header className="App__header">
        <h1>
          <button
            style={{ color: "#FF4500", textDecoration: "none" }}
            onClick={() => {
              this.context.updatePage();
            }}
          >
            Let 's draw it!!
          </button>
        </h1>
      </header>
    );

    return <div>{displayPage}</div>;
  }
}

export default MainRoute;
