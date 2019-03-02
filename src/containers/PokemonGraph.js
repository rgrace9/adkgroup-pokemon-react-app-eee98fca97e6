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

// const data = [{ name: "Defense", stat: 300 }, { name: "Attack", stat: 250 }];

class PokemonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
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

    // let cellColor;
    // let barColors = data.map((name, value) => {
    //   if (value >= 50) {
    //     cellColor = "#cc0000";
    //   } else if (value < 50 && value >= 20) {
    //     cellColor = "#FFFF00";
    //   } else if (value < 20) {
    //     cellColor = "#808080";
    //   }
    // });
    var data;
    if (this.state.checked === false) {
      data = statistics;
    } else if (this.state.checked === true) {
      data = moves;
    }

    return (
      <div>
        <h1 className="graph-heading">Pokemon Graph Container</h1>
        <div className="toggle-container">
          <label className="pokemon-graph">
            <span className="toggle">Statistics</span>
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
              checkedIcon={false}
              uncheckedIcon={false}
              height={35}
              width={70}
              className="toggle-container"
            />
            <span className="toggle">Moves</span>
          </label>
        </div>
        <BarChart
          className="pokemon-graph"
          width={800}
          height={500}
          data={data}
        >
          <XAxis dataKey="name" stroke="#2E2C2C" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" barSize={100} fill={"#808080"} />
        </BarChart>
      </div>
    );
  }
}

export default PokemonGraph;
