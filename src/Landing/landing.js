import React, { Component } from "react";
import "./landing.css";
import Context from "../Context";

class Landing extends Component {
  static contextType = Context;
  render() {
    return (
      <div role="main">
        <h2>Ready to paint?</h2>
        <div className="landing">
          <button
            className="btn_Start"
            onClick={() => {
              this.context.updatePage();
            }}
          >
            Let's paint it !!
          </button>
        </div>
      </div>
    );
  }
}

export default Landing;
