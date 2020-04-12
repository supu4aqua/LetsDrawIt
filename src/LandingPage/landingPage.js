import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./landingPage.css";
import Context from "../Context";

class LandingPage extends Component {
  static contextType = Context;
  render() {
    return (
      <div className="landingPage">
        <button
          className="btn_Draw"
          onClick={() => {this.context.updatePage()}}  >
          Let 's draw it !!
        </button>
      </div>
    );
  }
}

export default LandingPage;
