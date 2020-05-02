import React, { Component } from "react";
import "./existingPainting.css";
import Context from "../Context";

class ExistingPainting extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      paintingGrid: "",
      currentPainting: []
    };
  }

  componentDidMount() {
    console.log(this.context.cells);
    const cells = this.context.cells
      .filter(cell => {
        return cell.paintingid === parseInt(this.props.match.params.id);
      })
      .sort((a, b) => a.position - b.position);

    this.setState(
      {
        currentPainting: [...this.state.currentPainting, ...cells]
      },
      () => {
        const paintingGrid = this.createPaintingGrid(
          this.context.gridRowCount,
          this.context.gridColumnCount
        );
        this.setState({
          paintingGrid: paintingGrid
        });
      }
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const painting = {
      cells: this.state.currentPainting
    };
    this.setState({ error: null });
    fetch(`http://localhost:8000/api/cells`, {
      //  fetch(config.API_URL + `/api/paintings`, {
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
        this.context.updatePainting(data);
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
      let gridColumns = [];
      //Inner loop to create children
      for (let j = 0; j < Columns; j++) {
        console.log(this.state.currentPainting[position - 1]);
        gridColumns.push(
          <div
            className={`column ${
              this.state.currentPainting[position - 1].color
            }`}
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
      return painting.position === position;
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
    const painting = this.context.paintings.find(
      painting => painting.id === parseInt(this.props.match.params.id)
    );
    if (!painting) {
      return <p className="noteError">PAINTING NOT FOUND!!! </p>;
    }

    return (
      <div className="mainPage">
        <p>
          Instructions: Click on the color from the palette to select it. Click
          on the painting grid to set the color in the block.{" "}
        </p>
        <h2>{painting.name}</h2>
        <div>
          <ul className="palette">{palette}</ul>
        </div>

        <div>
          <ul className="grid">{this.state.paintingGrid}</ul>
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
