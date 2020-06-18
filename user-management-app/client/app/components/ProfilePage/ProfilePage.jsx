/*
 * File: ProfilePage.jsx
 * Project: user-management
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:34 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { userService, authService } from "../../services";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.currentUserValue
    };
  }

  componentDidMount() {
    authService.currentUser.subscribe(currentUser =>
      this.setState({ currentUser })
    );
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <h2 className="mb-4">Profile</h2>
        <Formik
          initialValues={currentUser}
          validationSchema={Yup.object().shape({
            fullname: Yup.string().required("Fullname is required"),
            email: Yup.string().email("Not a valid Email").required("Email is required")
          })}
          onSubmit={({ fullname, email }, { setStatus, setSubmitting }) => {
            setStatus();
            userService.updateUser(fullname, email).then(
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Update
                </button>
                {isSubmitting && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
              </div>
              {status && status !== "Success!" && <div className={"alert alert-danger"}>{status}</div>}
              {status && status === "Success!" && <div className={"alert alert-success"}>{status}</div>}
            </Form>
          )}
        />
      </div>
    );
  }
}

export { ProfilePage };
