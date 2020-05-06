import React, { Component } from "react";
import "./newPainting.css";
import Context from "../Context";
import config from "../config";

class NewPainting extends Component {
  state = {
    currentPainting: [
      { position: 1, color: "white" },
      { position: 2, color: "white" },
      { position: 3, color: "white" },
      { position: 4, color: "white" },
      { position: 5, color: "white" },
      { position: 6, color: "white" },
      { position: 7, color: "white" },
      { position: 8, color: "white" },
      { position: 9, color: "white" }
    ]
  };

  static contextType = Context;

  handleSubmit = e => {
    e.preventDefault();
    const { name } = e.target;
    const painting = {
      name: name.value,
      cells: this.state.currentPainting
    };
    this.setState({ error: null });
    fetch(config.API_URL + `/api/paintings`, {
      method: "POST",
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
        this.context.addPainting(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

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
            onClick={e => this.handlePaletteSelect(e)}
          >
            <span className="tooltiptext">{`${Colors[k]}`}</span>
          </div>
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

  createPaintingGrid(Rows, Columns) {
    let grid = [];
    let position = 1;
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      let gridColumns = [];
      //Inner loop to create children
      for (let j = 0; j < Columns; j++) {
        gridColumns.push(
          <div
            className="column"
            key={j}
            data-position={position}
            onClick={e => {
              this.handlePaintCell(e);
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

  handlePaletteSelect(e) {
    this.context.colorClicked = e.currentTarget.className.split(" ")[1];
  }

  handlePaintCell(e) {
    const initialClass = e.currentTarget.className.split(" ")[1];
    e.target.classList.remove(`${initialClass}`);
    e.target.classList.add(`${this.context.colorClicked}`);
    e.target.dataset.color = this.context.colorClicked;
    const position = e.target.dataset.position;
    const color = e.target.dataset.color;
    const cellIndex = this.state.currentPainting.findIndex(painting => {
      return painting.position === parseInt(position);
    });
    let updateCurrentPainting = Object.assign({}, this.state);
    updateCurrentPainting.currentPainting[cellIndex].color = color;
    this.setState(updateCurrentPainting);
  }

  render() {
    const palette = this.createPalette(
      this.context.paletteRowCount,
      this.context.paletteColumnCount,
      this.context.paletteColors
    );
    const paintingGrid = this.createPaintingGrid(
      this.context.gridRowCount,
      this.context.gridColumnCount
    );
    return (
      <div className="paint-area">
        <p>
          Instructions: Click color from the palette to select it. Click on the
          painting grid to set the color in the block.{" "}
        </p>
        <form className="addPainting" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Title </label>
          <input
            type="text"
            className="new-note"
            name="name"
            id="name"
            placeholder="painting-name"
            required
          />
          <div>
            <ul className="grid">{paintingGrid}</ul>
          </div>

          <div>
            <ul className="palette">{palette}</ul>
          </div>
          <button type="submit" className="btn-save-painting">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default NewPainting;
