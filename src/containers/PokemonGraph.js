import React, { Component } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

// const data = [{ name: "Defense", stat: 300 }, { name: "Attack", stat: 250 }];

class PokemonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { name: "Attack", stat: this.props.attack },
      { name: "Defense", stat: this.props.defense },
      { name: "Speed", stat: this.props.speed }
    ];
    return (
      <div>
        <h1>Pokemon Graph Container</h1>
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
          <Bar type="monotone" dataKey="stat" fill="#2E2C2C" barSize={100} />
        </BarChart>
      </div>
    );
  }
}

export default PokemonGraph;
