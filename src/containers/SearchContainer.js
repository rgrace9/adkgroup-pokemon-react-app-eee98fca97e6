import React, { Component } from "react";
import InfoBox from "./InfoBox";
import PokemonField from "../components/PokemonField";
import AutoSuggest from "../components/AutoSuggest";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      pokemons: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.pokemonSearch = this.pokemonSearch.bind(this);
  }

  pokemonSearch(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
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
          search: pokemonInfo
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.pokemonSearch(this.state.search);
  }

  handleClear() {
    this.setState({
      search: ""
    });
  }

  render() {
    return (
      <div>
        <h1>Search for Pokémon</h1>
        <form onSubmit={this.handleSubmit}>
          <PokemonField
            content={this.state.search}
            onChange={this.handleChange}
            name="search"
          />
          <input type="submit" />
          <AutoSuggest
            pokemon_suggestions={this.state.pokemons}
            onChange={this.handleChange}
            name="pokemons"
          />
        </form>
        <div>
          <InfoBox pokemon={this.state.search} />
        </div>
      </div>
    );
  }
}
export default SearchContainer;
