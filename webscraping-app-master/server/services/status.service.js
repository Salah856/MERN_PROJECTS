/*
 * File: status.service.js
 * Project: webscraping-app
 * File Created: Saturday, 20th July 2019 3:34:17 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Saturday, 20th July 2019 3:34:19 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

let status = "off";

class statusService {
  setStatus(_status) {
    status = _status;
  }
  getStatus() {
    return status;
  }
}

module.exports = statusService;
