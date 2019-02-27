import React, { Component } from "react";
import SearchContainer from "./containers/SearchContainer";
import "./scss/main.scss";

import { connect } from "react-redux";
import * as actions from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.props.setTitle("POKEMON`");
  }

  render() {
    return <SearchContainer />;
  }
}

const mapStateToProps = ({ title }) => {
  return {
    title
  };
};

const VisibleApp = connect(
  mapStateToProps,
  actions
)(App);

export default VisibleApp;
