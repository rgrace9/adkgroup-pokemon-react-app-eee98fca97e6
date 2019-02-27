import React, { Component } from "react";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ""
    };
    this.pokemonAdvancedSearch = this.pokemonAdvancedSearch.bind(this);
  }

  pokemonAdvancedSearch() {
    fetch(this.props.pokemon.forms[0].url)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(pokemonInfo => {
        console.log(pokemonInfo);
        this.setState({
          details: pokemonInfo
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  render() {
    // if (this.props.pokemon.length > 0) {
    //   return this.pokemonAdvancedSearch();
    // }
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
