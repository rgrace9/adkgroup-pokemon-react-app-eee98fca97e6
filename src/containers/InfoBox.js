import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{this.props.pokemon.name}</h2>
        <h2>{this.props.pokemon.height}</h2>
        <h2>{this.props.pokemon.weight}</h2>
        <img src={this.props.details} />
      </div>
    );
  }
}

export default InfoBox;
