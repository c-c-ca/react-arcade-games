import React, { Component } from 'react';
import { connect } from 'react-redux';
import { runGame } from '../actions';
import '../assets/css/style.css';

class Navigation extends Component {
  renderIcons() {
    const { isPlaying, runGame } = this.props;

    const icons = [
      {
        name: 'play',
        onClickHandler: () => {
          if (!isPlaying) runGame();
        },
      },
      { name: 'gauge' },
    ];

    return icons.map(({ name, onClickHandler = () => {} }) => (
      <li
        key={name}
        className={`icon icon-${name}`}
        onClick={onClickHandler}
      ></li>
    ));
  }

  render() {
    return (
      <nav className="nav">
        <ul>{this.renderIcons()}</ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ isPlaying }) => ({ isPlaying });

export default connect(mapStateToProps, { runGame })(Navigation);
