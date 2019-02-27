import React, { Component } from "react";
import SearchContainer from "./containers/SearchContainer";
import "./scss/main.scss";

import { connect } from "react-redux";
import * as actions from "./redux/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <SearchContainer />;
  }
}

export default App;
