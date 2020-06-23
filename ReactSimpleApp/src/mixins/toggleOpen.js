export default {
    getInitialState() {
        //this.props
        return {
            isOpen: false
        }
    },
    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}