/*
 * File: UpdateBlogPage.jsx
 * Project: blog-app
 * File Created: Wednesday, 17th July 2019 6:01:51 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 17th July 2019 6:03:21 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-md";
import draftToHtml from "draftjs-to-html";
import {
  convertToRaw,
  convertFromRaw,
  ContentState,
  EditorState
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { blogService } from "../../services";

class UpdateBlogPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      blog: {
        _id: "",
        title: "",
        subTitle: "",
        backgroundPicture: ""
      },
      content: EditorState.createEmpty()
    };
  }

  onContainStateChange = content => {
    this.setState({
      content
    });
  };

  async componentDidMount() {
    const blogId = this.props.match.params.blogId;
    blogService.fetchUserBlog(blogId).then(userBlog => {
      const blog = userBlog;
      const contentBlock = htmlToDraft(blog.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const content = EditorState.createWithContent(contentState);
        this.setState({
          blog,
          content
        });
        console.log(this.state);
      }
    });
  }

  render() {
    const { content, blog } = this.state;
    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: "url('assets/img/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Update Blog</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <Formik
                enableReinitialize="true"
                initialValues={blog}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Title is required"),
                  subTitle: Yup.string().required("SubTitle is required"),
                  backgroundPicture: Yup.string().required(
                    "Background Picture is required"
                  )
                })}
                onSubmit={(
                  { _id, title, subTitle, backgroundPicture },
                  { setStatus, setSubmitting }
                ) => {
                  const _blog = {
                    _id,
                    title,
                    subTitle,
                    backgroundPicture,
                    content: draftToHtml(
                      convertToRaw(content.getCurrentContent())
                    )
                  };
                  setStatus();
                  blogService.updateBlog(_blog).then(
                    success => {
                      setSubmitting(false);
                      setStatus("Success!");
                      this.props.history.push("/manage");
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
                      <label htmlFor="title">Title</label>
                      <Field
                        name="title"
                        type="text"
                        className={
                          "form-control" +
                          (errors.title && touched.title ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subTitle">SubTitle</label>
                      <Field
                        name="subTitle"
                        type="text"
                        className={
                          "form-control" +
                          (errors.subTitle && touched.subTitle
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="subTitle"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subTitle">Background Picture</label>
                      <Field
                        id="file"
                        name="file"
                        type="file"
                        onChange={event => {
                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            setFieldValue("backgroundPicture", reader.result);
                          };
                          reader.readAsDataURL(event.currentTarget.files[0]);
                        }}
                        className="form-control"
                      />
                      <Field
                        name="backgroundPicture"
                        type="text"
                        style={{
                          display: "none"
                        }}
                      />
                      <ErrorMessage
                        name="backgroundPicture"
                        component="div"
                        className="invalid-feedback"
                      />
                      <img
                        src={values.backgroundPicture}
                        className="img-thumbnail mt-2"
                        height={200}
                        width={200}
                      />
                    </div>
                    <div className="form-group">
                      <label>Content</label>
                      <Editor
                        editorState={content}
                        wrapperClassName="wysiwyg-wrapper"
                        editorClassName="wysiwyg-editor"
                        onEditorStateChange={this.onContainStateChange}
                      />
                      <Field
                        name="content"
                        type="text"
                        style={{
                          display: "none"
                        }}
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span
                        style={{
                          background: "rgb(235, 235, 228)",
                          display: "block"
                        }}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(content.getCurrentContent())
                          )
                        }}
                      />
                    </div>
                    {status && status !== "Success!" && (
                      <div className={"alert alert-danger"}>{status}</div>
                    )}
                    {status && status === "Success!" && (
                      <div className={"alert alert-success"}>{status}</div>
                    )}
                    <Button type="submit" raised primary>
                      Update
                    </Button>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { UpdateBlogPage };
