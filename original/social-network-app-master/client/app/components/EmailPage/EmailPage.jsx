/*
 * File: EmailPage.jsx
 * Project: social-network-app
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:12 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { authService } from "../../services";

import "../../../public/assets/css/bootstrap-4.css";
import "./EmailPage.css";

class EmailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="cd-main" style={{marginTop: "-20px"}}>
        <section className="cd-section index visible ">
          <div className="cd-content style1">
            <div className="login-box d-md-flex align-items-center">
              <h1 className="title">
                <img
                  src="assets/img/eduonix-logo-dark.png"
                  alt=""
                  style={{ width: "250px" }}
                />
              </h1>
              <h3 className="subtitle">
                Connect with followers and the world around you
              </h3>
              <div className="login-form-box">
                <div className="login-form-slider">
                  <div className="login-slide slide login-style1">
                    <h3>Please verify your email.</h3>
                    <br />
                    <Formik
                      initialValues={{
                        code: ""
                      }}
                      validationSchema={Yup.object().shape({
                        code: Yup.string().required("Code is required")
                      })}
                      onSubmit={({ code }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authService.verifyEmail(code).then(
                          user => {
                            const { from } = this.props.location.state || {
                              from: { pathname: "/" }
                            };
                            this.props.history.push(from);
                          },
                          error => {
                            setSubmitting(false);
                            setStatus(error.message);
                          }
                        );
                      }}
                      render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                          <div className="form-group">
                            <label htmlFor="code">Confirmation Code</label>
                            <Field
                              name="code"
                              type="text"
                              className={
                                "form-control" +
                                (errors.code && touched.code
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="code"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="submit">
                              Confirm{" "}
                              {isSubmitting && (
                                <img
                                  style={{ verticalAlign: "unset" }}
                                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                />
                              )}
                            </button>
                          </div>
                          {status && (
                            <div className={"alert alert-danger"}>{status}</div>
                          )}
                        </Form>
                      )}
                    />
                  </div>
                  <div className="signup-slide slide login-style1">
                    <div className="d-flex height-100-percentage">
                      <div className="align-self-center width-100-percentage">
                        <form>
                          <div className="form-group">
                            <label className="label">Name</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label className="label">Email</label>
                            <input type="email" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label className="label">Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label className="label">Confirm Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group padding-top-15px">
                            <input
                              type="submit"
                              className="submit"
                              value="Sign Up"
                            />
                          </div>
                        </form>
                        <div className="sign-up-txt">
                          if you have an account?{" "}
                          <a href="javascript:;" className="login-click">
                            login
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="forgot-password-slide slide login-style1">
                    <div className="d-flex height-100-percentage">
                      <div className="align-self-center width-100-percentage">
                        <form>
                          <div className="form-group">
                            <label className="label">
                              Enter your email address to reset your password
                            </label>
                            <input type="email" className="form-control" />
                          </div>
                          <div className="form-group">
                            <input
                              type="submit"
                              className="submit"
                              value="Submit"
                            />
                          </div>
                        </form>
                        <div className="sign-up-txt">
                          if you remember your password?{" "}
                          <a href="javascript:;" className="login-click">
                            login
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export { EmailPage };
