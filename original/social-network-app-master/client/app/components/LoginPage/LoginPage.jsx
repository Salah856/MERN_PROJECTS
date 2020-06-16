/*
 * File: LoginPage.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:30 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import { authService } from "../../services";

import "../../../public/assets/css/bootstrap-4.css";
import "./Login.css";
import "../../../public/assets/js/jquery.js";
import "../../../public/assets/js/velocity.min.js";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authService.currentUserValue) {
      this.props.history.push("/");
    }

    this.state = {
      modal: false
    };
  }

  openSignupSuccessModal = () => {
    this.setState({
      modal: true
    });
  };

  closeSignupSuccessModal = () => {
    this.setState({
      modal: false
    });
    this.signupLoginElement.click();
  };

  render() {
    const { modal } = this.state;
    return (
      <main className="cd-main">
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
                    <Formik
                      initialValues={{
                        email: "",
                        password: ""
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Not a valid Email")
                          .required("Email is required"),
                        password: Yup.string().required("Password is required")
                      })}
                      onSubmit={async (
                        { email, password },
                        { setStatus, setSubmitting }
                      ) => {
                        setStatus();
                        try {
                          await authService.login(email, password);
                          this.props.history.push("/");
                        } catch (error) {
                          setSubmitting(false);
                          setStatus(error.message);
                        }
                      }}
                      render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email
                            </label>
                            <Field
                              name="email"
                              type="text"
                              className={
                                "form-control" +
                                (errors.email && touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label className="label" htmlFor="password">
                              Password
                            </label>
                            <Field
                              name="password"
                              type="password"
                              className={
                                "form-control" +
                                (errors.password && touched.password
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="submit">
                              Sign In{" "}
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
                    <div className="sign-up-txt">
                      Don't have an account?{" "}
                      <a
                        onClick={() => {
                          jQuery(".signup-slide").velocity(
                            { translateX: ["0%", "-100%"] },
                            { display: "block" }
                          );
                          jQuery(".login-slide").velocity(
                            { translateX: "100%" },
                            { display: "none" }
                          );
                        }}
                        href="javascript:;"
                        className="sign-up-click"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                  <div className="signup-slide slide login-style1">
                    <Formik
                      initialValues={{
                        fullname: "",
                        email: "",
                        password: ""
                      }}
                      validationSchema={Yup.object().shape({
                        fullname: Yup.string().required("Fullname is required"),
                        email: Yup.string()
                          .email("Not a valid Email")
                          .required("Email is required"),
                        password: Yup.string().required("Password is required")
                      })}
                      onSubmit={(
                        { fullname, email, password },
                        { setStatus, setSubmitting }
                      ) => {
                        setStatus();
                        authService.register(fullname, email, password).then(
                          success => {
                            this.openSignupSuccessModal();
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
                            <label className="label" htmlFor="fullname">
                              Fullname
                            </label>
                            <Field
                              name="fullname"
                              type="text"
                              className={
                                "form-control" +
                                (errors.fullname && touched.fullname
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="fullname"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email
                            </label>
                            <Field
                              name="email"
                              type="text"
                              className={
                                "form-control" +
                                (errors.email && touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label className="label" htmlFor="password">
                              Password
                            </label>
                            <Field
                              name="password"
                              type="password"
                              className={
                                "form-control" +
                                (errors.password && touched.password
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="submit">
                              Sign Up{" "}
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
                    <div className="sign-up-txt">
                      if you have an account?{" "}
                      <a
                        ref={input => (this.signupLoginElement = input)}
                        onClick={() => {
                          jQuery(".login-slide").velocity(
                            { translateX: ["0%", "-100%"] },
                            { display: "block" }
                          );
                          jQuery(".signup-slide").velocity(
                            { translateX: "100%" },
                            { display: "none" }
                          );
                        }}
                        href="javascript:;"
                        className="sign-up-click"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <MDBContainer>
          <MDBModal isOpen={modal} toggle={this.closeSignupSuccessModal}>
            <MDBModalHeader toggle={this.closeSignupSuccessModal}>
              Info
            </MDBModalHeader>
            <MDBModalBody>
              You have succesfully registered! We have sent you a confirmation
              code in your email, please login and confirm your account.
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.closeSignupSuccessModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </main>
    );
  }
}

export { LoginPage };
