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
    let statistics = [
      { name: "Attack", value: this.props.attack },
      { name: "Defense", value: this.props.defense },
      { name: "Speed", value: this.props.speed }
    ];

    let moves = [
      { name: "Special Attack", value: this.props.specialAttack },
      { name: "Special Defense", value: this.props.specialDefense },
      { name: "Hit Points", value: this.props.hitPoints }
    ];

    var data;

    if (this.state.checked === false) {
      data = statistics;
    } else if (this.state.checked === true) {
      data = moves;
    }

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
        <BarChart
          className="pokemon-graph"
          width={800}
          height={500}
          data={data}
          margin={{ top: 30 }}
        >
          <XAxis dataKey="name" stroke="#2E2C2C" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" barSize={100} fill={cellColor} />;
        </BarChart>
      </div>
    );
  }
}

export default PokemonGraph;
