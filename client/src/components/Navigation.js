import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navigation extends Component {
  renderButton = () => {
    let text, path;

    switch (this.props.auth) {
      case null:
        text = 'Loading';
        path = '#';
        break;
      case false:
        text = 'Sign In With Google';
        path = '/auth/google';
        break;
      default:
        text = 'Sign Out';
        path = '/api/logout';
        break;
    }

    return (
      <a href={path} className="btn btn--transparent">
        {text}
      </a>
    );
  };

  render() {
    return <nav className="navigation">{this.renderButton()}</nav>;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Navigation);
