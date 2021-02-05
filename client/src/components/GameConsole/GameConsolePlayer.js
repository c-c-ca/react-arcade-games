import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class GameConsolePlayer extends Component {
  constructor(props) {
    super(props);
    this.displayRef = React.createRef();
  }

  state = { height: null, width: null };

  async componentDidMount() {
    const size = `${this.displayRef.current.clientWidth}px`;
    await this.setState({ height: size, width: size });
    await this.props.runGame();
    await this.props.onGameOver();
  }

  render() {
    return (
      <canvas
        {...this.state}
        id="display"
        className="game-console__player"
        ref={this.displayRef}
      ></canvas>
    );
  }
}

export default connect(null, actions)(GameConsolePlayer);
