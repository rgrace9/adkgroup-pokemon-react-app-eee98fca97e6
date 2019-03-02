import React, { Component } from "react";
import InfoBox from "./InfoBox";
import PokemonGraph from "./PokemonGraph";

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
      defense: "",
      attack: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
      hitPoints: "",
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
          pokemonType: pokemonInfo.types[0].type.name,
          defense: pokemonInfo.stats[3].base_stat,
          attack: pokemonInfo.stats[4].base_stat,
          speed: pokemonInfo.stats[0].base_stat,
          specialAttack: pokemonInfo.stats[2].base_stat,
          specialDefense: pokemonInfo.stats[1].base_stat,
          hitPoints: pokemonInfo.stats[5].base_stat
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
      <div className="row">
        <div className="column">
          <h1>Search for Pokémon</h1>
          <form onSubmit={this.handleSubmit}>
            <Select
              className="search-bar"
              options={this.state.pokemonResults}
              onChange={this.handleChange}
              value={selectedOption}
            />
          </form>
          <div>
            <InfoBox
              className="info-box"
              pokemon={this.state.search}
              image={this.state.image}
              pokemonType={this.state.pokemonType}
              attack={this.state.attack}
              defense={this.state.defense}
              speed={this.state.speed}
            />
          </div>
        </div>
        <div className="column">
          <PokemonGraph
            className="pokemon-graph column"
            attack={this.state.attack}
            defense={this.state.defense}
            speed={this.state.speed}
            specialAttack={this.state.specialAttack}
            specialDefense={this.state.specialDefense}
            hitPoints={this.state.hitPoints}
          />
        </div>
      </div>
    );
  }
}
export default SearchContainer;
