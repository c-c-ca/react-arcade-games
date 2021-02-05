import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class GameConsoleLeaderBoard extends Component {
  state = { records: [] };

  componentDidMount() {
    axios.get('/api/play-stats').then(({ data }) => {
      const records = data
        .sort((r1, r2) => r2.topScore - r1.topScore)
        .map((record, i) => ({ ...record, rank: i + 1 }));

      this.setState({ records });
    });
  }

  renderHeader() {
    return (
      <div className="leader-board__head">
        <div className="leader-board__rank">Rank</div>
        <div className="leader-board__username">Username</div>
        <div className="leader-board__score">Best Score</div>
      </div>
    );
  }

  renderBody = () => {
    return (
      <ul className="leader-board__body">
        {this.state.records.map(this.renderRow)}
      </ul>
    );
  };

  renderRow({ rank, username, topScore }) {
    return (
      <li className="leader-board__row">
        <div className="leader-board__rank">{rank}</div>
        <div className="leader-board__username">{username}</div>
        <div className="leader-board__score">{topScore}</div>
      </li>
    );
  }

  render() {
    return (
      <div className="leader-board">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(GameConsoleLeaderBoard);
