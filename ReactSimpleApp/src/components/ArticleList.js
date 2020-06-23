import React, { Component } from 'react';
import Article from './Article';
import oneOpen from '../decorators/oneOpen';
import Filters from "../containers/Filters";

class ArticleList extends Component {
  renderListItem = () => {
    const { articles, isItemOpen, toggleOpenItem } = this.props;
    return articles.map(article => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={isItemOpen(article.id)}
          openArticle={toggleOpenItem(article.id)}
        />
      </li>
    ));
  };

  render() {
    return (
      <div>
        <h1>Article list</h1>
        <Filters />
        <ul>{this.renderListItem()}</ul>
      </div>
    );
  }
}

export default oneOpen(ArticleList);
