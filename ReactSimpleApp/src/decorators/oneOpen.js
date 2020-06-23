import React, { Component as ReactComponent } from 'react'

export default (Component) => class OneOpen extends ReactComponent {
  state = {
    openItemId: null,
  };

  openItem = openItemId => ev => {
    if (ev) ev.preventDefault();
    this.setState({ openItemId });
  }

  toggleOpenItem = id => ev => {
    if (ev) ev.preventDefault()
    this.setState({
      openItemId: id === this.state.openItemId ? null : id
    });
  }

  isItemOpen = id => this.state.openItemId === id

  render() {
    return (
      <Component
        {...this.props}
        isItemOpen={this.isItemOpen}
        openItem={this.openItem}
        toggleOpenItem={this.toggleOpenItem}
      />
    );
  }
}