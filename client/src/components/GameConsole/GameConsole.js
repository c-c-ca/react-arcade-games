import React, { Component } from 'react';
import GameConsoleNav from './GameConsoleNav';
import GameConsoleDisplay from './GameConsoleDisplay';
import { LEADER_BOARD } from './Modes';

const INITIAL_STATE = { mode: LEADER_BOARD };

class GameConsole extends Component {
  state = INITIAL_STATE;

  render() {
    return (
      <div className="game-console">
        <GameConsoleNav onIconSelect={mode => this.setState({ mode })} />
        <GameConsoleDisplay
          mode={this.state.mode}
          onGameOver={() => this.setState(INITIAL_STATE)}
        />
      </div>
    );
  }
}

export default GameConsole;
