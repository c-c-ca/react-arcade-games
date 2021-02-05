import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import * as actions from '../actions';

class Profile extends Component {
  state = { username: '' };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.setUsername(this.state.username);
  };

  renderForm() {
    return (
      <form className="form" onSubmit={this.onSubmitHandler}>
        <div className="form__form-group">
          <label for="username" className="form__label">
            Choose Your Username
          </label>
          <input
            id="username"
            type="text"
            className="form__input"
            placeholder="Username"
            required
            onChange={e => this.setState({ username: e.target.value })}
          />
        </div>
        <div class="form__form-group">
          <button class="btn btn--transparent-white">Join</button>
        </div>
      </form>
    );
  }

  render() {
    return <Modal title={'Welcome!'} content={this.renderForm()} />;
  }
}

export default connect(null, actions)(Profile);
