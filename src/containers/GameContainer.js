import React, { Component } from "react";
import { Link } from "react-router";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonOne: "",
      pokemonTwo: "",
      pokemonList: "",
      nameOne: "",
      imageOne: "",
      movesOne: [],
      nameTwo: "",
      imageTwo: "",
      movesTwo: [],
      showMovesBox: false,
      movesOneSelected: [],
      movesTwoSelected: []
    };
    this.playGame = this.playGame.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.handleSubmitOne = this.handleSubmitOne.bind(this);
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
    this.pokemonMoveFetch = this.pokemonMoveFetch.bind(this);
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
          return pokemon.name;
        });
        let shufflePokemon = array => {
          var m = array.length,
            t,
            i;
          while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
          }
          return array;
        };
        this.setState({
          pokemonList: shufflePokemon(pokemonArray)
        });
        this.setState({
          pokemonOne: this.state.pokemonList[0],
          pokemonTwo: this.state.pokemonList[1]
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  playGame() {
    this.pokemonOneSearch(this.state.pokemonOne);
    this.pokemonTwoSearch(this.state.pokemonTwo);
    this.setState({ showMovesBox: true });
  }

  pokemonOneSearch(pokemon) {
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
          nameOne:
            pokemonInfo.forms[0].name.charAt(0).toUpperCase() +
            pokemonInfo.forms[0].name.slice(1),
          imageOne: pokemonInfo.sprites.front_default,
          movesOne: pokemonInfo.moves
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  pokemonTwoSearch(pokemon) {
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
          nameTwo:
            pokemonInfo.forms[0].name.charAt(0).toUpperCase() +
            pokemonInfo.forms[0].name.slice(1),
          imageTwo: pokemonInfo.sprites.front_default,
          movesTwo: pokemonInfo.moves
        });
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  handleChangeOne(event) {
    let checkedMoves = this.state.movesOneSelected;
    let selectedMove = event.target.value;
    if (event.target.checked === true) {
      checkedMoves.push(selectedMove);
      this.setState({ movesOneSelected: checkedMoves });
    } else {
      let moveIndex = checkedMoves.indexOf(selectedMove);
      checkedMoves.splice(moveIndex, 1);
      this.setState({ movesOneSelected: checkedMoves });
    }
  }

  handleChangeTwo(event) {
    let checkedMoves = this.state.movesTwoSelected;
    let selectedMove = event.target.value;

    if (event.target.checked === true) {
      checkedMoves.push(selectedMove);
      this.setState({ movesTwoSelected: checkedMoves });
    } else {
      let moveIndex = checkedMoves.indexOf(selectedMove);
      checkedMoves.splice(moveIndex, 1);
      this.setState({ movesTwoSelected: checkedMoves });
    }
  }

  handleSubmitOne(event) {
    event.preventDefault();
    let movesSelected = this.state.movesOneSelected;
    console.log("checkboxes selected");
    debugger;
  }

  handleSubmitTwo(event) {
    event.preventDefault();
    let movesSelected = this.state.movesTwoSelected;
    movesSelected.forEach(move => {
      this.pokemonMoveFetch(move);
    });
  }

  pokemonMoveFetch(move) {
    fetch(`https://pokeapi.co/api/v2/move/${move}/`)
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
        this.setState({});
      })
      .catch(error => console.log(`Error in fetch: ${error.message}`));
  }

  render() {
    let pokemonOneMoves;
    let pokemonTwoMoves;

    if (this.state.showMovesBox === true) {
      pokemonOneMoves = this.state.movesOne.map((move, index) => {
        return (
          <div key={index} className="moves-checkbox">
            <input
              name={move.move.name}
              type="checkbox"
              value={move.move.name}
              onChange={this.handleChangeOne}
            />
            {move.move.name}
          </div>
        );
      });

      pokemonTwoMoves = this.state.movesTwo.map((move, index) => {
        return (
          <div key={index} className="moves-checkbox">
            <input
              name={move.move.name}
              type="checkbox"
              value={move.move.name}
              onChange={this.handleChangeTwo}
            />
            {move.move.name}
          </div>
        );
      });
    }

    let movesOneUserSelect = this.state.movesOneSelected.map(
      (selection, index) => {
        return <h1 key={index}>{selection}</h1>;
      }
    );

    let movesTwoUserSelect = this.state.movesTwoSelected.map(
      (selection, index) => {
        return <h1 key={index}>{selection}</h1>;
      }
    );
    return (
      <div className="game-container">
        <div className="pokemon-game">
          <Link className="game-font" to="/">
            Return Home
          </Link>
        </div>
        <button onClick={this.playGame}>Play Game</button>
        <div className="game-row">
          <div className="column-left">
            <h1>{this.state.nameOne}</h1>
            <form className="moves-form" onSubmit={this.handleSubmit}>
              <button type="submit">Submit</button>
              <label>
                Select Three Moves
                {pokemonOneMoves}
              </label>
            </form>

            {movesOneUserSelect}
          </div>
          <div className="column-right">
            <h1>{this.state.nameTwo}</h1>
            <form className="moves-form" onSubmit={this.handleSubmit}>
              <button type="submit">Submit</button>
              <label>
                Select Three Moves
                {pokemonTwoMoves}
              </label>
            </form>

            {movesTwoUserSelect}
          </div>
        </div>
      </div>
    );
  }
}

export default GameContainer;
