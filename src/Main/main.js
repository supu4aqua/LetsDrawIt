import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./main.css";
//import Painting from "../Painting/painting";
import Context from "../Context";

class Main extends Component {
  static contextType = Context;

  deletePaintingRequest(paintingId, callback) {
      fetch(`http://localhost:8000/api/paintings/${paintingId}`, {
    //  fetch(config.API_URL + `/api/notes/${noteId}`, {
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
        //  console.log(res);
          return 'Painting Deleted';
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
    const paintings = this.context.paintings.map(painting => (
      <li key={painting.id}>
        <Link
          to={`/painting/${painting.id}`}
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
              painting.id,
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
