/*
 * File: LoginPage.jsx
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:30 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
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

import "./Login.css";
import "../../../public/assets/js/velocity.min.js";

import "../../../public/assets/css/style.css";

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
                          email: "",
                          password: ""
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string()
                            .email("Not a valid Email")
                            .required("Email is required"),
                          password: Yup.string().required(
                            "Password is required"
                          )
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
                            <div className="form-group user-name-field">
                              <Field
                                name="email"
                                type="text"
                                placeholder="Email"
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
                              <div className="field-icon">
                                <i className="ion-ios-email" />
                              </div>
                            </div>
                            <div className="form-group margin-bottom-30px forgot-password-field">
                              <Field
                                name="password"
                                type="password"
                                placeholder="Password"
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
                              <div className="field-icon">
                                <i className="ion-locked" />
                              </div>
                            </div>
                            <div className="form-group sign-in-btn">
                              <input
                                type="submit"
                                className="submit"
                                value="Sign In"
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
                      <div className="sign-up-txt">
                        Don't have an account?
                        <a
                          href="javascript:;"
                          className="sign-up-click"
                          onClick={() => {
                            $(".login-slide").velocity(
                              { translateX: "100%" },
                              { display: "none" }
                            );
                            setTimeout(() => {
                              $(".signup-slide").velocity(
                                { translateX: ["0%", "-100%"] },
                                { display: "block" }
                              );
                            }, 400);
                          }}
                        >
                          Signup
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="signup-slide slide" style={{ display: "none" }}>
                  <div className="d-flex height-100-percentage">
                    <div className="align-self-center width-100-percentage">
                      <h3>Sign Up</h3>
                      <Formik
                        initialValues={{
                          fullname: "",
                          email: "",
                          password: ""
                        }}
                        validationSchema={Yup.object().shape({
                          fullname: Yup.string().required(
                            "Fullname is required"
                          ),
                          email: Yup.string()
                            .email("Not a valid Email")
                            .required("Email is required"),
                          password: Yup.string().required(
                            "Password is required"
                          )
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
                            <div className="form-group user-name-field">
                              <Field
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
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
                              <div className="field-icon">
                                <i className="ion-person" />
                              </div>
                            </div>
                            <div className="form-group user-name-field">
                              <Field
                                name="email"
                                type="text"
                                placeholder="Email"
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
                              <div className="field-icon">
                                <i className="ion-ios-email" />
                              </div>
                            </div>
                            <div className="form-group">
                              <Field
                                name="password"
                                type="password"
                                placeholder="Password"
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
                              <div className="field-icon">
                                <i className="ion-locked" />
                              </div>
                            </div>
                            <div className="form-group sign-in-btn">
                              <input
                                type="submit"
                                className="submit"
                                value="Sign Up"
                              />{" "}
                            </div>
                            {status && (
                              <div className={"alert alert-danger"}>
                                {status}
                              </div>
                            )}
                          </Form>
                        )}
                      />
                      <div className="sign-up-txt">
                        if you have an account?
                        <a
                          ref={input => (this.signupLoginElement = input)}
                          href="javascript:;"
                          className="login-click"
                          onClick={() => {
                            $(".signup-slide").velocity(
                              { translateX: "100%" },
                              { display: "none" }
                            );
                            setTimeout(() => {
                              $(".login-slide").velocity(
                                { translateX: ["0%", "-100%"] },
                                { display: "block" }
                              );
                            }, 400);
                          }}
                        >
                          login
                        </a>
                      </div>
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
