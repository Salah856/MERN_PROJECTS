/*
 * File: RegisterPage.jsx
 * Project: user-management
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:39 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import { authService } from "../../services";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authService.currentUserValue) {
      this.props.history.push("/");
    }

    this.state = {
      modal: false
    }
  }

  openSuccessModal = () => {
    this.setState({
      modal: true
    });
  }

  closeSuccessModal = () => {
    this.setState({
      modal: false
    });
    this.props.history.push("/login");
  }

  render() {
    const { modal } = this.state;
    return (
      <div>
        <h2 className="mb-4">
          Signup /{" "}
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            Login
          </a>
        </h2>
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
                this.openSuccessModal();
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
                <label htmlFor="fullname">Fullname</label>
                <Field
                  name="fullname"
                  type="text"
                  className={
                    "form-control" +
                    (errors.fullname && touched.fullname ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Signup
                </button>
                {isSubmitting && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
              </div>
              {status && <div className={"alert alert-danger"}>{status}</div>}
            </Form>
          )}
        />
        <MDBContainer>
          <MDBModal isOpen={modal} toggle={this.closeSuccessModal}>
            <MDBModalHeader toggle={this.closeSuccessModal}>Info</MDBModalHeader>
            <MDBModalBody>
              You have succesfully registered! We have sent you a confirmation code in your email, please login and confirm your account.
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.closeSuccessModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

export { RegisterPage };
