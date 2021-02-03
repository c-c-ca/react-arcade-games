import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props);
    this.displayRef = React.createRef();
  }

  state = { height: null, width: null };

  componentDidMount() {
    const size = `${this.displayRef.current.clientWidth}px`;
    this.setState({ height: size, width: size });
  }

  render() {
    return <canvas {...this.state} id="display" ref={this.displayRef}></canvas>;
  }
}

export default Display;
