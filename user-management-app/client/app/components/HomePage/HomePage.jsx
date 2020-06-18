/*
 * File: HomePage.jsx
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:25 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

import {
  adminService,
  authService,
  modalService
} from "../../services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.currentUserValue,
      users: []
    };    
  }

  componentDidMount() {
    modalService.isUserUpdateModalOpened.subscribe(async modal => {
      await this.fetchUsers();
    });
    modalService.isUserCreateModalOpened.subscribe(async modal => {
      await this.fetchUsers();
    });
  }

  async fetchUsers() {
    const users = await adminService.fetchAll();
    this.setState({ users });
  }

  render() {
    const { currentUser, users } = this.state;
    const items = users.map(user => {
      return (
        <tr key={user._id}>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.emailVerified ? "yes" : "no"}</td>
          <td>{user.role}</td>
          <td>
            <a
              href="javascript:void(0)"
              className="text-primary"
              onClick={() => {
                modalService.openUserUpdateModal(user);
              }}
            >
              <i className="fa fa-edit fa-lg" />
            </a>
            &nbsp;
            <a
              href="javascript:void(0)"
              className="text-danger"
              onClick={async () => {
                await adminService.deleteUser(user._id);
                await this.componentDidMount();
              }}
            >
              <i className="fa fa-trash fa-lg" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h2 className="mb-4">
          Users
          <span className="pull-right">
            <button
              className="btn btn-primary"
              onClick={() => {
                modalService.openUserCreateModal();
              }}
            >
              Create
            </button>
          </span>
        </h2>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Email Verified</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{items}</MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export { HomePage };
