import React, { Component } from "react";
import Switch from "react-switch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid
} from "recharts";

class PokemonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(checked) {
    this.setState({ checked });
  }
  render() {
    let data = [
      { name: "Attack", value: this.props.attack },
      { name: "Defense", value: this.props.defense },
      { name: "Speed", value: this.props.speed }
    ];

    let cellColor;
    data.forEach(name => {
      if (name.value >= 50) {
        cellColor = "#cc0000";
      } else if (name.value < 50 && name.value >= 20) {
        cellColor = "#FFFF00";
      } else if (name.value < 20) {
        cellColor = "#808080";
      }
    });

    let pokemonGraph = (
      <div className="pokemon-graph">
        <BarChart width={800} height={500} data={data} margin={{ top: 30 }}>
          <XAxis dataKey="name" stroke="#2E2C2C" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" barSize={100} fill={cellColor} />;
        </BarChart>
      </div>
    );

    let pokemonMoves = this.props.moves.map((move, index) => {
      return (
        <div key={index}>
          <p className="moves-text">{move.move.name}</p>
        </div>
      );
    });

    let movesBox = <div className="moves-container">{pokemonMoves}</div>;

    let pokemonToggle;

    if (this.state.checked === false) {
      pokemonToggle = pokemonGraph;
    } else if (this.state.checked === true) {
      pokemonToggle = movesBox;
    }

    return (
      <div>
        <div className="toggle-row">
          <div className="pokemon-graph">
            <label>
              <span className="toggle">Statistics</span>
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked}
                checkedIcon={false}
                uncheckedIcon={false}
                height={35}
                width={70}
                onColor={"#1b5be4"}
                offColor={"#1b5be4"}
              />
              <span className="toggle">Moves</span>
            </label>
          </div>
        </div>
        <div className="statistics-moves-container">{pokemonToggle}</div>
      </div>
    );
  }
}

export default PokemonGraph;
