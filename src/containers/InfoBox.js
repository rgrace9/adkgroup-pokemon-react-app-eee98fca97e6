import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="column">
        <div className={this.props.pokemonType}>
          <img src={this.props.image} alt={this.props.pokemon.name} />
          <div className="pokemon-info">
            <h2 className="pokemon-name">
              {this.props.pokemon.name.charAt(0).toUpperCase() +
                this.props.pokemon.name.slice(1)}
            </h2>
            <h2>Attack: {this.props.attack}</h2>
            <h2>Defense: {this.props.defense}</h2>
            <h2>Speed: {this.props.speed}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoBox;
