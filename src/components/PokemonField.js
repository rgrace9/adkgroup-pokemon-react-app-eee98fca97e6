import React from "react";

const PokemonField = props => {
  return (
    <div>
      <input
        className="search-container"
        name={props.name}
        placeholder="Search"
        type="text"
        value={props.content}
        onChange={props.onChange}
      />
    </div>
  );
};

export default PokemonField;
