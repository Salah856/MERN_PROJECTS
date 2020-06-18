/*
 * File: SearchPage.jsx
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
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  listOptions = {
    page: 1,
    limit: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: props.match.params.keyword,
      searchResults: [],
      searchCount: 0,
      searchSuggestions: []
    };
  }

  refreshState() {
    this.setState({
      keyword: this.state.keyword,
      searchResults: this.state.searchResults,
      searchCount: this.state.searchCount,
      searchSuggestions: this.state.searchSuggestions
    });
  }

  async componentDidMount() {
    await this.searchFeeds();
  }

  async searchFeeds() {
    const searchResults = await searchService.searchFeed({
      keyword: this.state.keyword,
      page: this.listOptions.page,
      limit: this.listOptions.limit
    });
    this.state.searchResults = searchResults.rows;
    this.state.searchCount = searchResults.count;
    this.refreshState();
  }

  setPage(page) {
    this.listOptions.page = page;
    this.searchFeeds();
  }

  async searchSuggestions(keyword) {
    if (keyword !== "") {
      this.state.searchSuggestions = await searchService.searchSuggestions(
        keyword
      );
    } else {
      this.state.searchSuggestions = [];
      this.state.keyword = "";
    }
    this.refreshState();
  }

  render() {
    const feedItems = this.state.searchResults.map((searchResult, i) => {
      return (
        <span key={searchResult._id}>
          <h5>
            <a href={searchResult.link}>{searchResult.meta.title}</a>
          </h5>
          <p>{searchResult.meta.subtitle}</p>
        </span>
      );
    });
    const pageItems = () => {
      const pages = []; 
      const pageCount = Math.ceil((this.state.searchCount / this.listOptions.limit));
      for (let i = 0; i < pageCount; i++) {
        pages.push(
          (
            <li className={"page-item" + ((i+1) === this.listOptions.page ? " active" : "")} key={i}>
              <button className="page-link" onClick={() => {
                this.setPage(i+1);
              }}>
                {i + 1}
              </button>
            </li>
          )
        )
      }
      return pages;
    };
    return (
      <>
        <div className="top-bar px-4 py-4">
          <form className="form-inline">
            <img
              src="assets/img/search-logo.png"
              alt=""
              width="100"
              className="mr-4"
              onClick={() => {
                history.push("/");
              }}
            />
            <div className="input-group">
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
                  this.setPage(1);
                }}
                filterBy={(option, props) => {
                  return true;
                }}
                defaultInputValue={this.state.keyword}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    history.push("/search/" + this.state.keyword);
                    this.setPage(1);
                  }}
                >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <hr />

        <div className="px-5 w-50">{feedItems}</div>

        <nav aria-label="Page navigation example" className="px-5 py-4">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" aria-label="Previous" onClick={() => {
                if (this.listOptions.page-1 > 0) {
                  this.setPage(this.listOptions.page-1);
                }
              }}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            </li>
            {pageItems()}
            <li className="page-item">
              <button className="page-link" aria-label="Next" onClick={() => {
                if (this.listOptions.page+1 <= Math.ceil((this.state.searchCount / this.listOptions.limit))) {
                  this.setPage(this.listOptions.page+1);
                }
              }}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export { SearchPage };
