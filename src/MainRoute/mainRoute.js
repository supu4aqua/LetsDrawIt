import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./mainRoute.css";
import Main from "../Main/main";
import Landing from "../Landing/landing";
import Context from "../Context";

class MainRoute extends Component {
  static contextType = Context;

  render() {
    //console.log("In Main Route", this.context.isLandingPage);
    const displayPage = this.context.isLandingPage ? <Landing /> : <Main />

    return <div className="mainRoute">{displayPage}</div>;
  }
}

export default MainRoute;
