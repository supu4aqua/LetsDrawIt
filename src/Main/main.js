import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import Context from "../Context";
import config from "../config";

class Main extends Component {
  static contextType = Context;

  //Delete painting and update the state by calling callback function
  deletePaintingRequest(paintingId, callback) {
    fetch(config.API_URL + `/api/paintings/${paintingId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return "Painting Deleted";
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(paintingId);
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const paintings = this.context.paintings
    .sort((a, b) => b.id - a.id)
    .map(painting => (
      <li key={painting.id} className="paintings">
        <Link
          to={`/paintings/${painting.id}`}
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
          onClick={() => { if (window.confirm('Are you sure you wish to delete this painting?'))
            this.deletePaintingRequest(
              painting.id,
              this.context.deletePainting
            );
          }}
        ></button>
      </li>
    ));


    return (
      <div role="main" className="mainPage">
        <p>
          Instructions: Click color from the palette to select it. Click on the
          painting grid to set the color in the block.{" "}
        </p>
        <Link
          to="/painting"
          style={{
            textDecoration: "none"
          }}
        >
          <button title="Create new painting" className="btn-new-painting">
            Create new painting
          </button>
        </Link>

        <div className="paintingList">
          <ul>{paintings}</ul>
        </div>
      </div>
    );
  }
}

export default Main;
