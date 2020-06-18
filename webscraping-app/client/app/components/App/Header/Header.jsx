/*
 * File: NavBar.jsx
 * Project: webscraping-app
 * File Created: Tuesday, 11th June 2019 1:31:37 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Tuesday, 11th June 2019 1:35:29 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="logo px-3 pt-3">
          <img src="assets/img/logo.png" width="50" className="d-inline" />
          <h4 className="d-inline">Webscraping</h4>
        </div>
      </>
    );
  }
}

export { Header };
