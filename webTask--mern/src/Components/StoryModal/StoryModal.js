import React from 'react';
import Modal from 'react-modal';

import './StoryModal.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class ModalComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      author: '',
      content: '',
      _id: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    if(e.target.id === 'author') {
      this.setState({author: e.target.value})
    }
    if(e.target.id === 'content') {
      this.setState({content: e.target.value})
    }
  }

  componentWillReceiveProps({story}) {
    this.setState(story)
  }

  render() {
    const {
        modalIsOpen,
        closeModal
    } = this.props;
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal.bind(this, null)}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            contentLabel="Story Modal"
        >

          <div className="Modal">
            <h4 className="text-center">Story Form</h4>
            <div className="col-md-6 col-md-offset-3">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={this.state.author} onChange={this.handleInputChange} id="author" className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea value={this.state.content} onChange={this.handleInputChange} cols="30" id="content" className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <button
                      className="ModalButton"
                      onClick={closeModal.bind(this, this.state)}
                  > Save</button>
                  <button
                      className="ModalButton ModalButton--close"
                      onClick={closeModal.bind(this, null)}
                  > Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
    )
  }
}