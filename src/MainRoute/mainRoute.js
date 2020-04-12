import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./mainRoute.css";
import MainPage from "../MainPage/mainPage";
import LandingPage from "../LandingPage/landingPage";
import Context from "../Context";

class MainRoute extends Component {
  static contextType = Context;

  render() {
    //console.log("In Main Route", this.context.isLandingPage);
    const displayPage = this.context.isLandingPage ? <LandingPage /> : <MainPage />

    return <div className="mainRoute">{displayPage}</div>;
  }
}

export default MainRoute;
