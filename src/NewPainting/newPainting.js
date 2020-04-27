import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./newPainting.css";
import Context from "../Context";
//import config from '../config';

class NewPainting extends Component {
  //  constructor(props){
  //super(props);
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

    /*currentPainting: {
        "cells": [
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
      }*/
    /*currentPainting: {
          1: { position: 1, color: "white" },
          2: { position: 2, color: "white" },
          3: { position: 3, color: "white" },
          4: { position: 4, color: "white" },
          5: { position: 5, color: "white" },
          6: { position: 6, color: "white" },
          7: { position: 7, color: "white" },
          8: { position: 8, color: "white" },
          9: { position: 9, color: "white" }
        }*/
  };
  //this.handlePaintCell = this.handlePaintCell.bind(this);
  //}
  static contextType = Context;

  handleSubmit = e => {
    e.preventDefault();
    //console.log(`New Painting in handle submit ${this.context}`);
    console.log(`Painting in handleSubmit is ${this.state.currentPainting}`);
    //console.log(e.target.elements);
    //  console.log(`Inside handlesubmit, dataposition is ${e.target.dataset.position}`)
    //console.log(`New Painting is ${this.context.newPainting}`)
    this.postPainting(e);
    //this.postCell(e);
  };

  postPainting(e) {
    //let newPaintingId;
    const { name } = e.target;
    const painting = {
      name: name.value,
      cells: this.state.currentPainting
    };
    this.setState({ error: null });
    fetch(`http://localhost:8000/api/paintings`, {
      //  fetch(config.API_URL + `/api/paintings`, {
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
        this.postCell(e);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  }



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

  createPaintingGrid(Rows, Columns) {
    let grid = [];
    let position = 1;
    // Outer loop to create parent
    for (let i = 0; i < Rows; i++) {
      //  grid.push(<li className="row"></li>);
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
    //handlePaintCell = (e) => {
    const initialClass = e.currentTarget.className.split(" ")[1];
    e.target.classList.remove(`${initialClass}`);
    e.target.classList.add(`${this.context.colorClicked}`);
    e.target.dataset.color = this.context.colorClicked;
    const position = e.target.dataset.position;
    const color = e.target.dataset.color;

    console.log(`Position is ${position}`);

    const cellIndex = this.state.currentPainting.findIndex(painting => {
      return painting.position === parseInt(position);
    });
    console.log(cellIndex);
    let updateCurrentPainting = Object.assign({}, this.state);
    updateCurrentPainting.currentPainting[cellIndex].color = color;
    this.setState(updateCurrentPainting);
    console.log(
      this.state.currentPainting.map(
        painting =>
          `Painting in render is ${painting.position} with a color of ${painting.color}`
      )
    );
  }

  render() {
    // const currentPainting = this.state.currentPainting.cells.map(painting => `Painting in render is ${painting.position} with a color of ${painting.color}`)
    //  console.log(`Painting in render is ${this.state.currentPainting}`);
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
        <p>
          Instructions: Click on the color from the palette to select it. Click
          on the painting grid to set the color in the block.{" "}
        </p>
        <div>
          <ul className="palette">{palette}</ul>
        </div>

        <div>
          <ul className="grid">{paintingGrid}</ul>
        </div>
        <label htmlFor="name">Title </label>
        <form className="addPainting" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="new-note"
            name="name"
            id="name"
            placeholder="painting-name"
            required
          />
          <button type="submit" className="btn-save-painting">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default NewPainting;
