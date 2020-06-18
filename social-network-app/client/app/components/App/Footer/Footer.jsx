/*
 * File: Footer.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:03 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";

import "./Footer.css";
import config from "../../../../../config/config";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: config.client.apiUrl
    };
  }

  render() {
    const { apiUrl } = this.state;
    return (
      <div className="text-center">
        <p>
          <a
            href="https://gitlab.anomalistdesign.com/company/mongodb-for-beginners/social-network-app-app"
            target="_blank"
          >
            Gitlab Repository
          </a>
        </p>
        <p>
          <a href={apiUrl + "/documentation"} target="_blank">
            Api Documentation
          </a>
        </p>
        <p>
          <a href="https://www.company.com" target="_blank">
            Company.com
          </a>
        </p>
      </div>
    );
  }
}

export { Footer };
