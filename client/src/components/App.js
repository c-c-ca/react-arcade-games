import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Navigation from './Navigation';
import GameConsole from './GameConsole/GameConsole';
import Profile from './Profile';
import history from '../history';
import '../assets/css/style.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <div>
          <Router history={history}>
            <Navigation />
            <Switch>
              <Route path="/" exact component={GameConsole} />
              <Route path="/profile" exact component={Profile} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App);
