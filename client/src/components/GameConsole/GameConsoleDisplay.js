import React, { Component } from 'react';
import GameConsolePlayer from './GameConsolePlayer';
import GameConsoleLeaderBoard from './GameConsoleLeaderBoard';
import { RUN_GAME, LEADER_BOARD } from './Modes';

class GameConsoleDisplay extends Component {
  renderContent = () => {
    switch (this.props.mode) {
      case RUN_GAME:
        return <GameConsolePlayer onGameOver={this.props.onGameOver} />;
      case LEADER_BOARD:
        return <GameConsoleLeaderBoard />;
    }
  };

  render() {
    return <div className="game-console__display">{this.renderContent()}</div>;
  }
}

export default GameConsoleDisplay;
