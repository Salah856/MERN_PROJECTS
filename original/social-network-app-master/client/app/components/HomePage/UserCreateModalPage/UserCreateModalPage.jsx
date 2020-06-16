/*
 * File: UserCreateModalPage.jsx
 * Project: social-network-app
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:17 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { modalService } from "../../../services/modal.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { adminService } from "../../../services";

class UserCreateModalPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: modalService.isUserCreateModalOpenedValue,
      user: {
        email: "",
        fullname: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    modalService.isUserCreateModalOpened.subscribe(modal => {
      this.setState({ modal });
    });
  }

  toggle = () => {
    modalService.isUserCreateModalOpenedValue = !this.state.modal;
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { user, modal } = this.state;
    const footerStyle = {
      paddingBottom: "0px"
    };
    return (
      <MDBContainer>
        {/* MODAL */}
        <MDBModal isOpen={modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Create User</MDBModalHeader>
          <MDBModalBody>
            <Formik
              initialValues={user}
              validationSchema={Yup.object().shape({
                fullname: Yup.string().required("Fullname is required"),
                email: Yup.string().email("Not a valid Email").required("Email is required"),
                password: Yup.string().required("Password is required")
              })}
              onSubmit={(
                { fullname, email, password },
                { setStatus, setSubmitting }
              ) => {
                setStatus();
                adminService.createUser(fullname, email, password).then(
                  success => {
                    setSubmitting(false);
                    setStatus("Success!");
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
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Password</label>
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
                    {isSubmitting && (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </div>
                  {status && status !== "Success!" && (
                    <div className={"alert alert-danger"}>{status}</div>
                  )}
                  {status && status === "Success!" && (
                    <div className={"alert alert-success"}>{status}</div>
                  )}
                  <MDBModalFooter style={footerStyle}>
                    <MDBBtn color="secondary" onClick={this.toggle}>
                      Close
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save changes
                    </MDBBtn>
                  </MDBModalFooter>
                </Form>
              )}
            />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export { UserCreateModalPage };
