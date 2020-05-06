import React, { Component } from "react";
import "./existingPainting.css";
import Context from "../Context";
import config from "../config";

class ExistingPainting extends Component {
  static contextType = Context;

  //When save button is clicked, make a PUT request to update the cells
  handleSubmit = e => {
    e.preventDefault();

    //Filter the cells that needs to be updated based on props id
    const cells = this.context.cells
      .filter(cell => {
        return cell.paintingid === parseInt(this.props.match.params.id);
      })
      .sort((a, b) => a.position - b.position);

    const painting = {
      cells: cells
    };

    this.setState({ error: null });

    fetch(config.API_URL + `/api/cells`, {
      method: "PUT",
      body: JSON.stringify(painting),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  //Create Color Palette
  createPalette(Rows, Columns, Colors) {
    let palette = [];
    let k = 0;
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      let paletteColumns = [];
      //Inner loop to create children

      for (let j = 0; j < Columns; j++) {
        paletteColumns.push(
          <div
            className={`palette-column ${Colors[k]}`}
            key={j}
            onClick={e => this.context.handlePaletteSelect(e)}
          ></div>
        );
        k++;
      }
      //Create the parent and add the children
      palette.push(
        <li className="palette-row" key={i}>
          {paletteColumns}
        </li>
      );
    }
    return palette;
  }

  //Create Painting Grid of 3 x 3
  createPaintingGrid(Rows, Columns, currentPainting) {
    let grid = [];
    let position = 1;
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      let gridColumns = [];
      //Inner loop to create children
      for (let j = 0; j < Columns; j++) {
        gridColumns.push(
          <div
            className={`column ${currentPainting[position - 1].color}`}
            key={j}
            data-position={position}
            data-cellid={currentPainting[position - 1].id}
            onClick={e => {
              this.context.handlePaintCell(e);
            }}
          ></div>
        );
        position++;
      }
      //Create the parent and add the children
      grid.push(
        <li className="row" key={i}>
          {gridColumns}
        </li>
      );
    }
    return grid;
  }

  render() {
    //Check if painting with specified id exists or not
    const painting = this.context.paintings.find(
      painting => painting.id === parseInt(this.props.match.params.id)
    );

    //If painting doesn't exist, display an error message
    if (!painting) {
      return <p className="noteError">PAINTING NOT FOUND!!! </p>;
    }

    //Call to create painting palette
    const palette = this.createPalette(
      this.context.paletteRowCount,
      this.context.paletteColumnCount,
      this.context.paletteColors
    );

    const currentPainting = this.context.setCurrentPainting(
      parseInt(this.props.match.params.id)
    );

    //Call to create painting grid only if currentPainting has some data
    let grid = "";
    if (currentPainting.length > 0) {
      grid = this.createPaintingGrid(
        this.context.gridRowCount,
        this.context.gridColumnCount,
        currentPainting
      );
    }

    return (
      <div className="paint-area">
        <p>
          Instructions: Click color from the palette to select it. Click on the
          painting grid to set the color in the block.{" "}
        </p>
        <h2>{painting.name}</h2>
        <div>
          <ul className="grid">{grid}</ul>
        </div>
        <div>
          <ul className="palette">{palette}</ul>
        </div>

        <button
          type="submit"
          className="btn-save-painting"
          onClick={this.handleSubmit}
        >
          Save
        </button>
      </div>
    );
  }
}

export default ExistingPainting;
