/*
 * File: Footer.jsx
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:03 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
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
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p className="copyright text-muted">
                Copyright &copy; Eduonix 2019
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export { Footer };
