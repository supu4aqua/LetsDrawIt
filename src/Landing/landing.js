import React, { Component } from "react";
import "./landing.css";
import Context from "../Context";

class Landing extends Component {
  static contextType = Context;
  render() {
    return (
      <div role="main" className="landingPage">
        <h2>Color the blocks and create a painting!! </h2>
        <h2>Ready to paint?</h2>

        <button
          className="btn_Start"
          onClick={() => {
            this.context.updatePage();
          }}
        >
          <span>Let's paint it !! </span>
        </button>
      </div>
    );
  }
}

export default Landing;
