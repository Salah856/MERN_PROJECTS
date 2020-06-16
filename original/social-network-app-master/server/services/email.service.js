/*
 * File: email.service.js
 * Project: social-network-app
 * File Created: Thursday, 6th June 2019 11:26:24 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:13 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const nodemailer = require("nodemailer");
const Email = require("email-templates");
let transporter;

class EmailService {
  constructor() {
    this.transporter = transporter;
  }

  setConfig(emailConfig) {
    transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
      }
    });
  }

  async sendEmail(email, template, data) {
    const _email = new Email({
      message: {
        from: "support@company.com"
      },
      send: true,
      transport: this.transporter,
      views: {
        options: {
          extension: "ejs"
        }
      },
      preview: false
    });

    await _email.send({
      template,
      message: {
        to: email
      },
      locals: {
        data
      }
    });
    return null;
  }
}

module.exports = EmailService;
