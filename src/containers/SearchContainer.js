import React, { Component } from "react";
import InfoBox from "./InfoBox";
import PokemonGraph from "./PokemonGraph";
import Select from "react-select";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      name: "",
      image: "",
      moves: [],
      details: "",
      pokemonType: "",
      defense: "",
      attack: "",
      speed: "",
      selectedOption: null,
      pokemonResults: [],
      showInfoBox: false
    };
    this.handleChange = this.handleChange.bind(this);
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
          option["label"] =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
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
        this.setState({
          search: pokemonInfo,
          name: pokemonInfo.forms[0].name,
          image: pokemonInfo.sprites.front_default,
          pokemonType: pokemonInfo.types[0].type.name,
          defense: pokemonInfo.stats[3].base_stat,
          attack: pokemonInfo.stats[4].base_stat,
          speed: pokemonInfo.stats[0].base_stat,
          moves: pokemonInfo.moves,
          showInfoBox: true
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
    this.pokemonSearch(selectedOption.value);
  };

  render() {
    const { selectedOption } = this.state;
    let infoBox;

    if (this.state.showInfoBox) {
      infoBox = (
        <InfoBox
          className="info-box"
          pokemon={this.state.search}
          image={this.state.image}
          pokemonType={this.state.pokemonType}
          attack={this.state.attack}
          defense={this.state.defense}
          speed={this.state.speed}
        />
      );
    }
    return (
      <div className="row">
        <div className="column">
          <h1>Search for Pokémon</h1>
          <form onSubmit={this.handleSubmit}>
            <Select
              placeholder="Search"
              className="search-bar"
              options={this.state.pokemonResults}
              onChange={this.handleChange}
              value={selectedOption}
            />
          </form>
          <div>{infoBox}</div>
        </div>
        <div className="graph-column">
          <PokemonGraph
            className="pokemon-graph column"
            attack={this.state.attack}
            defense={this.state.defense}
            speed={this.state.speed}
            moves={this.state.moves}
          />
        </div>
      </div>
    );
  }
}
export default SearchContainer;
