import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import Painting from "../Painting/painting";
import Context from "../Context";

class Main extends Component {
  static contextType = Context;

  deletePaintingRequest(paintingId, callback) {
    console.log("In deletePainting");
  }
  render() {
    //console.log(this.context.paintings);
    const paintings = this.context.paintings.map(painting => (
      <li key={painting.painting_id}>
        <Link
          to={`/painting/${painting.painting_id}`}
          style={{
            color: "00FFFF",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px"
          }}
        >
          {painting.name}
        </Link>
        <button
          title="Delete Painting"
          className="btn-delete-painting"
          onClick={() => {
            this.deletePaintingRequest(
              painting.painting_id,
              this.context.deletePainting
            );
          }}
        >
          Delete
        </button>
      </li>
    ));

    return (
      <div role="main" className="mainPage">
        <Link to="/painting">
          <button title="Create new painting" className="btn-new-painting">
            Create new painting
          </button>
        </Link>

        <div>
          <ul>{paintings}</ul>
        </div>
      </div>
    );
  }
}

export default Main;
