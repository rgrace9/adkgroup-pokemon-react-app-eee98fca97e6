import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let attack = `Attack: ${this.props.attack}`;
    let defense = `Defense: ${this.props.defense}`;
    return (
      <div className="info-box">
        <div className={this.props.pokemonType}>
          <img src={this.props.image} alt={this.props.pokemon.name} />
          <div className="pokemon-info">
            <h2 className="pokemon-name">{this.props.pokemon.name}</h2>
            <h2>{attack}</h2>
            <h2>{defense}</h2>
            <h2>Speed: {this.props.speed}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoBox;
