import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // if (){
    //
    // }
    return (
      <div className="info-box">
        <div className={this.props.pokemonType}>
          <img src={this.props.image} />
          <h2 className="pokemon-info">{this.props.pokemon.name}</h2>
        </div>
      </div>
    );
  }
}

export default InfoBox;
