import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
  state = { visible: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 0);
  }

  resolveClassNames = name => {
    return `${name} ${this.state.visible ? `${name}--visible` : ''}`;
  };

  render() {
    return ReactDOM.createPortal(
      <div className={this.resolveClassNames('modal')}>
        <div className={this.resolveClassNames('modal__content')}>
          <h2 className="modal__header heading-secondary u-margin-bottom-small">
            {this.props.title}
          </h2>
          {this.props.content}
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

export default Modal;
