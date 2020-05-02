import React, { Component } from "react";
import "./mainRoute.css";
import Main from "../Main/main";
import Landing from "../Landing/landing";
import Context from "../Context";

class MainRoute extends Component {
  static contextType = Context;

  render() {
    const displayPage = this.context.isLandingPage ? <Landing /> : <Main />;
    return <div className="mainRoute">{displayPage}</div>;
  }
}

export default MainRoute;
