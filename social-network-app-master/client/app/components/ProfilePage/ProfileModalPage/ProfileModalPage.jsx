/*
 * File: ProfileModalPage.jsx
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 9:45:30 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 9:49:37 am
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
import { authService, userService } from "../../../services";

class ProfileModalPage extends React.Component {
  isProfileModalOpenedSub;
  constructor(props) {
    super(props);

    this.state = {
      modal: modalService.isProfileModalOpenedValue,
      currentUser: authService.currentUserValue
    };
  }

  async componentDidMount() {
    this.isProfileModalOpenedSub = modalService.isProfileModalOpened.subscribe(
      modal => {
        const currentUser = authService.currentUserValue;
        this.setState({ modal, currentUser });
      }
    );
  }

  componentWillUnmount() {
    this.isProfileModalOpenedSub.unsubscribe();
  }

  toggle = () => {
    modalService.isProfileModalOpenedValue = !this.state.modal;
    this.setState({
      modal: !this.state.modal
    });
  };

  resizeImage = (e, w, h) => {
    return new Promise(resolve => {
      let intv = setInterval(
        () => {
          const img = document.createElement("img");
          img.src = e;

          const canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = w;
          const MAX_HEIGHT = h;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataurl = canvas.toDataURL(file.type);
          if (dataurl !== "data:,") {
            clearInterval(intv);
            intv = undefined;
            resolve(dataurl);
          }
        },
        100
      );
    });
  };

  render() {
    const { modal, currentUser } = this.state;
    const footerStyle = {
      paddingBottom: "0px"
    };
    return (
      <MDBContainer>
        {/* MODAL */}
        <MDBModal isOpen={modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Update Profile</MDBModalHeader>
          <MDBModalBody>
            <Formik
              initialValues={currentUser}
              validationSchema={Yup.object().shape({
                fullname: Yup.string().required("Fullname is required"),
                email: Yup.string()
                  .email("Not a valid Email")
                  .required("Email is required")
              })}
              onSubmit={(
                { fullname, email, profilePicture },
                { setStatus, setSubmitting }
              ) => {
                setStatus();
                userService.updateUser(fullname, email, profilePicture).then(
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
              render={({
                values,
                errors,
                status,
                touched,
                isSubmitting,
                setFieldValue
              }) => (
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
                    <label htmlFor="email">Profile Picture</label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={event => {
                        const reader = new FileReader();
                        reader.onloadend = async () => {
                          /*
                           * Resize Image
                           */
                          const dataurl = await this.resizeImage(reader.result, 100, 100);
                          setFieldValue("profilePicture", dataurl);
                        };
                        reader.readAsDataURL(event.currentTarget.files[0]);
                      }}
                      className="form-control"
                    />
                    <img
                      src={values.profilePicture}
                      className="img-thumbnail mt-2"
                      height={200}
                      width={200}
                    />
                    <ErrorMessage
                      name="profilePicture"
                      component="div"
                      className="invalid-feedback"
                    />
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

export { ProfileModalPage };
