/*
 * File: HomePage.jsx
 * Project: search-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:25 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { history } from "../../helpers";
import { Typeahead } from "react-bootstrap-typeahead";
import { searchService } from "../../services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      searchSuggestions: []
    };
  }

  refreshState() {
    this.setState({
      keyword: this.state.keyword,
      searchSuggestions: this.state.searchSuggestions
    });
  }

  componentDidMount() {}

  async searchSuggestions(keyword) {
    if (keyword !== "") {
      this.state.searchSuggestions = await searchService.searchSuggestions(
        keyword
      );
    } else {
      this.state.searchSuggestions = [];
    }
    this.refreshState();
  }

  render() {
    return (
      <>
        <div className="page">
          <div className="search-div">
            <img src="assets/img/search-logo.png" alt="" />
            <div className="input-group mt-5">
              <Typeahead
                minLength={2}
                options={this.state.searchSuggestions}
                onInputChange={value => {
                  this.state.keyword = value;
                  this.refreshState();
                  this.searchSuggestions(value);
                }}
                onChange={values => {
                  this.state.keyword = values[0];
                  this.refreshState();
                  history.push("/search/" + this.state.keyword);
                }}
                filterBy={(option, props) => {
                  return true;
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    history.push("/search/" + this.state.keyword);
                  }}
                >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { HomePage };
