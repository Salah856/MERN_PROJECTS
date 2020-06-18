/*
 * File: HomePage.jsx
 * Project: webscraping-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:25 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { webscrapingService, sockjsService } from "../../services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      webscrapingStatus: "off",
      logs: []
    };
  }

  refreshState() {
    this.setState({
      webscrapingStatus: this.state.webscrapingStatus,
      logs: this.state.logs
    });
  }

  componentDidMount() {
    const sock = sockjsService.connect();
    sock.onopen = () => {
      sock.send('status');
      this.state.logs.push({
        dateReceived: new Date().toLocaleTimeString(),
        message: "Connected to SockJS!"
      });
      this.refreshState();
    };
    sock.onmessage = e => {
      if (e.data === "on") {
        this.state.webscrapingStatus = "on";
      }
      else if (e.data === "off") {
        this.state.webscrapingStatus = "off";
      } else {
        this.state.logs.push({
          dateReceived: new Date().toLocaleTimeString(),
          message: e.data
        });
      }
      this.refreshState();
    };
  }

  render() {
    const logItems = this.state.logs.map((log, i) => {
      return (
        <span key={i}>
          [{log.dateReceived}] {log.message}
          <br />
        </span>
      );
    });
    return (
      <>
        <div className="example text-center">
          <button
            type="button"
            className={"btn btn-lg btn-toggle " + (this.state.webscrapingStatus === "on" ? "active" : "")}
            data-toggle="button"
            aria-pressed="true"
            autoComplete="off"
            onClick={() => {
              if (this.state.webscrapingStatus === "off") {
                this.state.webscrapingStatus = "on";
                webscrapingService.startWebscraping();
              } else {
                this.state.webscrapingStatus = "off";
                webscrapingService.stopWebscraping();
              }
              this.refreshState();
            }}
          >
            <div className="handle" />
          </button>
        </div>

        <div className="console">
          <div className="px-4 py-4 no-wrap">
            <p>{logItems}</p>
          </div>
        </div>
      </>
    );
  }
}

export { HomePage };
