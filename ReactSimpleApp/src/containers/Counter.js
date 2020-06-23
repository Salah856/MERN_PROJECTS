import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increment, decrement } from "../actions";

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func
  };

  handleIncrement = e => {
    e.preventDefault();
    this.props.increment();
  };

  handleDecrement = e => {
    e.preventDefault();
    this.props.decrement();
  };

  render() {
    return (
      <div>
        <h1>{this.props.count}</h1>
        <button onClick={this.handleIncrement}>
          increment
        </button>
        <button onClick={this.handleDecrement}>
          decrement
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count
  };
};

export default connect(
  mapStateToProps,
  { increment, decrement }
)(Counter);
