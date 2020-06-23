import React from "react";
import { connect } from "react-redux";
import ArticleList from "../components/ArticleList";

function Articles(props) {
  const { articles } = props;
  return <ArticleList articles={articles} />;
}

const mapStateToProps = state => {
  return {
    articles: filterArticles(state.article.articles, state.filters)
  };
};

export default connect(
  mapStateToProps,
  {}
)(Articles);

function filterArticles(articles, { from, to, selectedArticles }) {
  return articles
    .valueSeq()
    .filter(article =>
      selectedArticles.length ? selectedArticles.includes(article.id) : true
    )
    .filter(
      article =>
        (!from || Date.parse(article.date) > from) &&
        (!to || Date.parse(article.date) < to)
    );
}
