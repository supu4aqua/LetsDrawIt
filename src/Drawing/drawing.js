import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./drawing.css";

class Drawing extends Component {

  render() {

    return (
      <div className="mainPage">

          <Link to="/">
            <button title="Let's draw it!!" ></button>
          </Link>

      </div>
    );
  }
}

export default Drawing;
