/*
 * File: MessageModal.jsx
 * Project: social-network-app
 * File Created: Tuesday, 18th June 2019 1:45:26 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Tuesday, 18th June 2019 1:45:50 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
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
import { modalService, messageService } from "../../../services";

class MessageModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.state = {
      modal: modalService.isMessageModalOpenedValue,
      messages: [],
      to: "",
      messageValue: ""
    };
  }

  async componentDidMount() {
    modalService.isMessageModalOpened.subscribe(async modal => {
      const to = modalService.modalContentValue;
      await this.setState({
        modal,
        to
      });
      if (to !== "") {
        await this.fetchMessages(to);
      }
    });
  }

  async fetchMessages(to) {
    const messages = await messageService.fetchMessages(to);
    this.setState({
      messages
    });
  }

  handleMessageChange(value) {
    this.setState({ messageValue: value });
  }

  toggle = () => {
    modalService.isMessageModalOpenedValue = !this.state.modal;
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { modal, messages, to, messageValue } = this.state;
    const formatAMPM = (date) => {
      date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    const items = messages.map(message => {
      if (!message.isMe) {
        return (
          <li style={{ width: "100%" }} key={message._id}>
            <div className="msj macro" style={{ marginTop: "10px" }}>
              <div className="avatar">
                <img
                  className="img-circle"
                  style={{ width: "100%" }}
                  src={message.from.profilePicture}
                />
              </div>

              <div className="text text-l">
                <p>{message.message}</p>
                <p>
                  <small>{formatAMPM(message.createdDate)}</small>
                </p>
              </div>
            </div>
          </li>
        );
      } else {
        return (
          <li style={{ width: "100%" }} key={message._id}>
            <div className="msj-rta macro" style={{ marginTop: "10px" }}>
              <div className="text text-r">
                <p>{message.message}</p>
                <p>
                  <small>{formatAMPM(message.createdDate)}</small>
                </p>
              </div>
              <div
                className="avatar"
                style={{ padding: "0px 0px 0px 10px !important" }}
              >
                <img
                  className="img-circle"
                  style={{ width: "100%" }}
                  src={message.from.profilePicture}
                />
              </div>
            </div>
          </li>
        );
      }
    });
    return (
      <MDBContainer>
        {/* MODAL */}
        <MDBModal isOpen={modal} toggle={this.toggle} backdrop={false}>
          <MDBModalHeader toggle={this.toggle}>Message Box</MDBModalHeader>
          <MDBModalBody>
            <div id="messageBody" className="frame">
              <ul style={{ listStyle: "none" }}>
                {items}
              </ul>
              <div>
                <div className="msj-rta macro">
                  <div
                    className="text text-r"
                    style={{ background: "whitesmoke !important" }}
                  >
                    <input
                      value={messageValue}
                      onChange={event => {
                        this.handleMessageChange(event.target.value);
                      }}
                      className="mytext"
                      placeholder="Type a message"
                    />
                  </div>
                </div>
                <button
                  onClick={async () => {
                    {
                      (() => {
                        this.handleMessageChange("");
                      })();
                    }
                    await messageService.sendMessage(to, messageValue);
                    await this.fetchMessages(to);
                  }}
                  style={{ padding: "12px" }}
                >
                  <i className="fa fa-share" />
                </button>
              </div>
            </div>
            {(() => {
              setTimeout(() => {
                $("#messageBody").animate(
                  { scrollTop: $(document).height() },
                  100
                );
              }, 100);
            })()}
          </MDBModalBody>
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

export { MessageModal };
