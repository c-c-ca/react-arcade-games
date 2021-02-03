import React, { Component } from 'react';
import Navigation from './Navigation';
import Display from './Display';
import '../assets/css/style.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navigation />
        <Display />
      </div>
    );
  }
}

export default App;
