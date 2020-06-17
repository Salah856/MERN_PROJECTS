/*
 * File: blog.service.js
 * Project: blog-app
 * File Created: Wednesday, 17th July 2019 12:17:17 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 17th July 2019 12:17:22 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import config from "../../../config/config";
import { authService } from "./auth.service";

export const blogService = {
  addBlog,
  listUserBlog,
  fetchUserBlog,
  updateBlog,
  deleteUserBlog,
  listBlogs,
  fetchBlog
};

async function addBlog(blog) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ blog })
  };

  const addBlogRes = await (await fetch(
    `${config.client.apiUrl}/blog/add`,
    requestOptions
  )).json();
  if (addBlogRes.success) {
    return addBlogRes.message;
  } else {
    throw new Error(addBlogRes.message);
  }
}

async function updateBlog(blog) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ blog })
  };

  const addBlogRes = await (await fetch(
    `${config.client.apiUrl}/blog/update`,
    requestOptions
  )).json();
  if (addBlogRes.success) {
    return addBlogRes.message;
  } else {
    throw new Error(addBlogRes.message);
  }
}

async function listUserBlog() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue
    }
  };

  const listUserBlogRes = await (await fetch(
    `${config.client.apiUrl}/user/blog/list`,
    requestOptions
  )).json();
  if (listUserBlogRes.success) {
    return listUserBlogRes.data.userBlogs;
  } else {
    throw new Error(listUserBlogRes.message);
  }
}

async function fetchUserBlog(blogId) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue
    }
  };

  const fetchUserBlogRes = await (await fetch(
    `${config.client.apiUrl}/user/blog/` + blogId,
    requestOptions
  )).json();
  if (fetchUserBlogRes.success) {
    return fetchUserBlogRes.data.userBlog;
  } else {
    throw new Error(fetchUserBlogRes.message);
  }
}

async function deleteUserBlog(blogId) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue
    }
  };

  const deleteUserBlogRes = await (await fetch(
    `${config.client.apiUrl}/user/blog/delete/` + blogId,
    requestOptions
  )).json();
  if (deleteUserBlogRes.success) {
    return deleteUserBlogRes.message;
  } else {
    throw new Error(deleteUserBlogRes.message);
  }
}

async function listBlogs(options) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ options })
  };

  const listUserBlogRes = await (await fetch(
    `${config.client.apiUrl}/blog/list`,
    requestOptions
  )).json();
  if (listUserBlogRes.success) {
    return listUserBlogRes.data.blogs;
  } else {
    throw new Error(listUserBlogRes.message);
  }
}

async function fetchBlog(blogId) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue
    }
  };

  const fetchUserBlogRes = await (await fetch(
    `${config.client.apiUrl}/blog/` + blogId,
    requestOptions
  )).json();
  if (fetchUserBlogRes.success) {
    return fetchUserBlogRes.data.blog;
  } else {
    throw new Error(fetchUserBlogRes.message);
  }
}