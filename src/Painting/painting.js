import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./painting.css";
import Context from "../Context";

class Painting extends Component {
  static contextType = Context;
  //let color = 'white';
  createPalette(Rows, Columns, Colors) {
    let palette = [];
    let k = 0;
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      //  grid.push(<li className="row"></li>);
      let paletteColumns = [];
      //Inner loop to create children
      for (let j = 0; j < Columns; j++) {
        //console.log(Colors[k]);
        paletteColumns.push(
          <div
            className={`palette-column ${Colors[k]}`}
            key={j}
            onClick={e => this.handlePaletteSelect(e)}
          ></div>
        );
        k++;
      }
      //Create the parent and add the children
      palette.push(<li className="palette-row">{paletteColumns}</li>);
    }
    return palette;
  }

  createPaintingGrid(Rows, Columns) {
    let grid = [];
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      //  grid.push(<li className="row"></li>);
      let gridColumns = [];
      //Inner loop to create children
      for (let j = 0; j < Columns; j++) {
        //gridColumns.push(<div className="column" key={j} onClick={this.bindEventListeners}></div>);
        gridColumns.push(
          <div
            className="column"
            key={j}
            onClick={e => this.handlePaintCell(e)}
          ></div>
        );
      }
      //Create the parent and add the children
      grid.push(<li className="row">{gridColumns}</li>);
    }
    return grid;
  }

  handlePaletteSelect(e) {
    //let color = 'blue';

    this.context.colorClicked = e.currentTarget.className.split(" ")[1];
    console.log(this.context.colorClicked);
  }

  handlePaintCell(e) {
    console.log("Inside handlePaintCell");

      const initialClass = e.currentTarget.className.split(" ")[1];
      console.log(initialClass);
      e.target.classList.remove(`${initialClass}`);
    e.target.classList.add(`${this.context.colorClicked}`);
    //$(e.currentTarget).attr('class', `${initialClass} ${color}`);
    console.log(e.currentTarget.classList.contains("column"));
    console.log(e);
  }

  /* bindEventListeners(e) {
   console.log(e);
  this.handlePaletteSelect(e);
 this.handlePaintCell(e);
console.log('Inside bindEventListeners');
}*/

  render() {
    //  console.log(this.context.gridRows);
    //  console.log(this.context.gridColumns);
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
      <div className="mainPage">
      <p>Instructions:
      Click on the color from the palette to select it.
      Click on the painting grid to set the color in the block. </p>
        <div>
          <ul className="palette">{palette}</ul>
        </div>
        <div>
          <ul className="grid">{paintingGrid}</ul>
        </div>

        <button className="btn-save-painting">Save</button>
      </div>
    );
  }
}

export default Painting;
