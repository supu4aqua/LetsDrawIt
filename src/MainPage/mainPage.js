import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mainPage.css";
import Drawing from "../Drawing/drawing";

class MainPage extends Component {

  render() {

    return (
      <div className="mainPage">
      <header className="App__header">
        <h1>
          <Link to="/" style={{ color: "#FF4500", textDecoration: "none" }}>
            Heading
          </Link>{" "}
        </h1>
      </header>
      <button
        className="btn_NewDrawing"
      //  onClick={() => {this.newDrawing();}>}  
          >
        Create new drawing
      </button>

      </div>
    );
  }
}

export default MainPage;
