/*
 * File: PostPage.jsx
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
import { blogService } from "../../services";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        title: "",
        subTitle: "",
        backgroundPicture: "",
        content: "",
        user: {
          email: ""
        }
      }
    };
  }

  async componentDidMount() {
    const blogId = this.props.match.params.blogId;
    await this.fetchBlog(blogId);
  }

  async fetchBlog(blogId) {
    let blog = await blogService.fetchBlog(blogId);
    this.setState({
      blog
    });
  }

  render() {
    const { blog } = this.state;

    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: "url(" + blog.backgroundPicture + ")" }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="post-heading">
                  <h1 dangerouslySetInnerHTML={{ __html: blog.title }} />
                  <h2
                    className="subheading"
                    dangerouslySetInnerHTML={{ __html: blog.subTitle }}
                  />
                  <span className="meta">
                    Posted by{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {blog.user.fullname}
                    </span>{" "}
                    on{" "}
                    {(() => {
                      const cts = blog.createdDate;
                      return new Date(cts).toString();
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <article>
          <div className="container">
            <div className="row">
              <div
                className="col-lg-8 col-md-10 mx-auto"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </article>
      </>
    );
  }
}

export { PostPage };
