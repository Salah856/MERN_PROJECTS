/*
 * File: EmailPage.jsx
 * Project: blog-app
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:12 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { authService } from "../../services";

import "./EmailPage.css";

class EmailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="cd-main">
        <section className="cd-section index2 visible">
          <div className="cd-content style2">
            <div className="login-box">
              <div className="login-form-slider">
                <div className="login-slide slide">
                  <div className="d-flex height-100-percentage">
                    <div className="align-self-center width-100-percentage">
                      <h3>Sign In</h3>
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
                            <div className="form-group user-name-field">
                              <Field
                                name="code"
                                type="text"
                                placeholder="Confirmation Code"
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
                              <div className="field-icon">
                                <i className="ion-ios-email" />
                              </div>
                            </div>
                            <div className="form-group sign-in-btn">
                              <input
                                type="submit"
                                className="submit"
                                value="Verify"
                              />
                            </div>
                            {status && (
                              <div className={"alert alert-danger"}>
                                {status}
                              </div>
                            )}
                          </Form>
                        )}
                      />
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
