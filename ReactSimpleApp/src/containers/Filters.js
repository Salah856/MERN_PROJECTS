import React, { Component } from "react";
import Select from "react-select";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { changeFilters } from "../actions";

class Filters extends Component {
  handleSelectChange = selectedArticles => {
    const { changeFilters } = this.props;
    changeFilters({
      selectedArticles
    });
  };

  getRangeTitle() {
    const { from, to } = this.props.filters;
    return (
      <p>
        {!from && !to && "Please select the first day."}
        {from && !to && "Please select the last day."}
        {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
        {from && to && (
          <button className="link" onClick={this.handleResetClick}>
            Reset
          </button>
        )}
      </p>
    );
  }

  handleDayClick = day => {
    const { filters, changeFilters } = this.props;
    const range = DateUtils.addDayToRange(day, filters);
    changeFilters(range);
  };

  handleResetClick = () => {
    const { changeFilters } = this.props;
    changeFilters({ from: undefined, to: undefined });
  };

  render() {
    const { articles, filters } = this.props;
    const { from, to, selectedArticles } = filters;
    const modifiers = { start: from, end: to };
    const options = articles.map(article => ({
      label: article.title,
      value: article.id
    }));
    return (
      <div>
        {this.getRangeTitle()}
        <Select
          options={options.toJS()}
          isMulti={true}
          value={selectedArticles}
          onChange={this.handleSelectChange}
        />
        <DayPicker
          className="Selectable"
          selectedDays={{ from, to }}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.article.articles.valueSeq(),
    filters: state.filters
  };
};

export default connect(
  mapStateToProps,
  {
    changeFilters
  }
)(Filters);
