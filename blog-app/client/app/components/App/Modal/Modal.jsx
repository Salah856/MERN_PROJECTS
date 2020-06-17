/*
 * File: Modal.jsx
 * Project: blog-app
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:17 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { modalService } from "../../../services/modal.service";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: modalService.isModalOpenedValue,
      message: modalService.modalContentValue
    };
  }

  async componentDidMount() {
    $("body").removeClass("modal-open");
    modalService.isModalOpened.subscribe(modal => {
      this.setState({ 
        modal,
        message: modalService.modalContentValue
      });
    });
  }

  toggle = () => {
    modalService.isModalOpenedValue = !this.state.modal;
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { message, modal } = this.state;
    return (
      <MDBContainer>
        {/* MODAL */}
        <MDBModal isOpen={modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Info</MDBModalHeader>
          <MDBModalBody>
            {message}
          </ MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export { Modal };
