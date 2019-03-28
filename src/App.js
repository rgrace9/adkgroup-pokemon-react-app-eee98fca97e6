import React, { Component } from "react";
import SearchContainer from "./containers/SearchContainer";
import GameContainer from "./containers/GameContainer";
import { Router, browserHistory, Route } from "react-router";
import "./scss/main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SearchContainer} />
        <Route path="/game" component={GameContainer} />
      </Router>
    );
  }
}

export default App;
