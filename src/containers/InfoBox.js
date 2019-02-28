import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ""
    };
  }
  componentDidMount() {
    this.props.pokemonAdvancedSearch(this.props.url);
  }

  render() {
    return (
      <div>
        <h2>{this.props.pokemon.name}</h2>
        <h2>{this.props.pokemon.height}</h2>
        <h2>{this.props.pokemon.weight}</h2>
      </div>
    );
  }
}

export default InfoBox;
