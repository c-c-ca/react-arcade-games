import React, { Component } from 'react';
import { RUN_GAME, LEADER_BOARD, MODE_3, MODE_4, MODE_5 } from './Modes';

class GameConsoleNav extends Component {
  renderIcons() {
    const icons = [
      { name: 'game-controller', mode: RUN_GAME },
      { name: 'area-graph', mode: LEADER_BOARD },
      { name: 'bar-graph', mode: MODE_3 },
      { name: 'gauge', mode: MODE_4 },
      { name: 'list', mode: MODE_5 },
    ];

    return icons.map(({ name, mode }) => (
      <li
        key={name}
        className={`icon icon--${name}`}
        onClick={() => this.props.onIconSelect(mode)}
      ></li>
    ));
  }

  render() {
    return (
      <nav className="game-console__nav">
        <ul>{this.renderIcons()}</ul>
      </nav>
    );
  }
}

export default GameConsoleNav;
