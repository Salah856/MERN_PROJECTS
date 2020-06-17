/*
 * File: HomePage.jsx
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:25 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Link } from 'react-router-dom';
import { blogService } from "../../services";

class HomePage extends React.Component {
  listOptions = {
    skip: 0,
    limit: 3
  };

  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      showNew: true,
      showOld: false
    };
  }

  async componentDidMount() {
    await this.fetchBlogs();
  }

  async fetchBlogs(
    options = {
      type: "older"
    }
  ) {
    if (options.type === "newer") {
      this.listOptions.skip = 0;
    }
    let blogs = await blogService.listBlogs(this.listOptions);
    if (blogs.length) {
      this.listOptions.skip += this.listOptions.limit;
      this.state.showNew = true;
      this.state.blogs = blogs;
      setTimeout(
        () => {
          this.state.showNew = false;
          this.setState(this.state);
        },
        5000
      )
      if (options.type === "older") {
        this.state.showNew = false;
      } else {
        this.state.showOld = false;
      }
    } else {
      if (options.type === "older") {
        this.state.showNew = false;
        this.state.showOld = true;
      }
    }
    this.setState(this.state);
  }

  async fetchNewerBlogs() {
    await this.fetchBlogs({
      type: "newer"
    });
  }

  async fetchOlderBlogs() {
    await this.fetchBlogs({
      type: "older"
    });
  }

  render() {
    const { blogs, showNew, showOld } = this.state;
    const blogItems = blogs.map((blog, i) => {
      return (
        <>
          <div className="post-preview" key={blog._id}>
            <Link
              to={"/blog/" + blog._id}
            >
              <h2 className="post-title">{blog.title}</h2>
              <h3 className="post-subtitle">{blog.subTitle}</h3>
            </Link>
            <p className="post-meta">
              Posted by{" "}
              <span style={{ fontWeight: "bold" }}>{blog.user.fullname}</span>{" "}
              on{" "}
              {(() => {
                const cts = blog.createdDate;
                return new Date(cts).toString();
              })()}
            </p>
          </div>
          <hr />
        </>
      );
    });

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
                  <h1>Eduonix Blog</h1>
                  <span className="subheading">A Blog App by Eduonix</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {blogItems}
              <div className="clearfix">
                {!showNew && (
                  <a
                    className="btn btn-primary float-left"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.fetchNewerBlogs();
                    }}
                  >
                    &larr; Newer Posts
                  </a>
                )}
                {!showOld && (
                  <a
                    className="btn btn-primary float-right"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.fetchOlderBlogs();
                    }}
                  >
                    Older Posts &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { HomePage };
