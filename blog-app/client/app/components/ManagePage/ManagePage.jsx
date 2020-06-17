/*
 * File: ManagePage.jsx
 * Project: blog-app
 * File Created: Wednesday, 17th July 2019 4:56:51 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 17th July 2019 5:01:00 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import DataTable from "react-data-table-component";
import { Card, Button, FontIcon, Checkbox } from "react-md";
import React from "react";
import differenceBy from "lodash/differenceBy";
import { history } from "../../helpers";
import "./ManagePage.css";
import { blogService } from "../../services";

class ManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      toggleCleared: false,
      data: []
    };
  }

  async componentDidMount() {
    blogService.listUserBlog().then(data => {
      this.setState({ data });
    });
  }

  handleChange = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = row => {
    console.log(`${row.name} was clicked!`);
  };

  deleteAll = () => {
    const { selectedRows } = this.state;
    const rows = selectedRows.map(r => r.title);

    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      for (const i in selectedRows) {
        blogService.deleteUserBlog(selectedRows[i]._id).then(res => {
          // success
        });
      }
      this.setState(state => ({
        toggleCleared: !state.toggleCleared,
        data: differenceBy(state.data, state.selectedRows, "title")
      }));
    }
  };

  render() {
    const actions = [
      <Button
        key="add"
        flat
        secondary
        iconChildren="add"
        onClick={() => {
          history.push("/blog-create");
        }}
      >
        Add
      </Button>
    ];

    const contextActions = [
      <Button
        key="delete"
        onClick={this.deleteAll}
        style={{ color: "red" }}
        icon
      >
        delete
      </Button>
    ];

    const columns = [
      {
        name: "Title",
        selector: "title",
        sortable: false
      },
      {
        cell: (cellData) => (
          <Button raised primary onClick={() => {
            this.props.history.push("/blog-update/" + cellData._id);
          }}>
            Edit
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      }
    ];

    const { data, toggleCleared } = this.state;

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
                  <h1>Manage Posts</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <Card style={{ height: "100%" }}>
                <DataTable
                  title="Your Blogs"
                  columns={columns}
                  data={data}
                  selectableRows
                  highlightOnHover
                  actions={actions}
                  contextActions={contextActions}
                  sortIcon={<FontIcon>arrow_downward</FontIcon>}
                  selectableRowsComponent={Checkbox}
                  selectableRowsComponentProps={{
                    uncheckedIcon: isIndeterminate =>
                      isIndeterminate ? (
                        <FontIcon>indeterminate_check_box</FontIcon>
                      ) : (
                        <FontIcon>check_box_outline_blank</FontIcon>
                      )
                  }}
                  onTableUpdate={this.handleChange}
                  clearSelectedRows={toggleCleared}
                  onRowClicked={this.handleRowClicked}
                />
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { ManagePage };
