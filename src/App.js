import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';

import Table from './components/Table';

import FilterText from './components/FilterText';
import FilterNum from './components/FilterNum';

import DisplayFilterNum from './components/DisplayFilterNum';
import ShortTable from './components/ShortTable';

import fetchPlanets from './actions/database';


class App extends Component {

  componentDidMount() {
    this.props.getPlanets();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Table} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

App.propTypes = {
  getPlanets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
