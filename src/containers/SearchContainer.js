import React, { Component } from "react";
import InfoBox from "./InfoBox";
import PokemonField from "../components/PokemonField";
import Select from "react-select";
//recharts

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      image: "",
      details: "",
      pokemonType: "",
      selectedOption: null,
      pokemonResults: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.pokemonSearch = this.pokemonSearch.bind(this);
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=964`)
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
      .then(pokemon => {
        let pokemonArray = pokemon.results.map(pokemon => {
          let option = {};
          option["value"] = pokemon.name;
          option["label"] = pokemon.name;
          return option;
        });
        this.setState({
          pokemonResults: pokemonArray
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
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
          search: pokemonInfo,
          image: pokemonInfo.sprites.front_default,
          pokemonType: pokemonInfo.types[0].type.name
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
    this.pokemonSearch(selectedOption.value);
    this.handleClear();
  };

  handleClear() {
    this.setState({
      search: ""
    });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <h1>Search for Pokémon</h1>
        <form onSubmit={this.handleSubmit}>
          <Select
            className="search-container"
            options={this.state.pokemonResults}
            onChange={this.handleChange}
            value={selectedOption}
          />
        </form>
        <div>
          <InfoBox
            pokemon={this.state.search}
            image={this.state.image}
            pokemonType={this.state.pokemonType}
          />
        </div>
      </div>
    );
  }
}
export default SearchContainer;
