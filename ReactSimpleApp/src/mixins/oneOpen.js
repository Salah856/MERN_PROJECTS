export default {
  getInitialState() {
    return {
      openItemId: false
    }
  },
  openItem(openItemId) {
    return ev => {
      if (ev) ev.preventDefault()
      this.setState({ openItemId });
    }
  },

  toggleOpenItem(id) {
    return ev => {
      if (ev) ev.preventDefault();
      this.setState({
        openItemId: id === this.state.openItemId ? null : id
      });
    }
  },

  isItemOpen(id) {
    return this.state.openItemId === id;
  }
}