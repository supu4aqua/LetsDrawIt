import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./painting.css";

class Painting extends Component {
  render() {
    return (
      <div className="mainPage">
        <div>
          <ul className="palette">
          <li className="palette-row">
            <div className="palette-column black"></div>
            <div className="palette-column yellow"></div>
          </li>
            <li className="palette-row">
              <div className="palette-column blue"></div>
              <div className="palette-column orange"></div>
            </li>
            <li className="palette-row">
              <div className="palette-column red"></div>
              <div className="palette-column brown"></div>
            </li>
            <li className="palette-row">
              <div className="palette-column green"></div>
              <div className="palette-column pink"></div>
            </li>
            <li className="palette-row">
              <div className="palette-column purple"></div>
              <div className="palette-column cyan"></div>
            </li>
          </ul>
        </div>
        <div>
          <ul className="grid">
            <li className="row">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column"></div>
            </li>
            <li className="row">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column"></div>
            </li>
            <li className="row">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column"></div>
            </li>
          </ul>
        </div>

        <button className="btn-save-painting">Save</button>
      </div>
    );
  }
}

export default Painting;
