import { DELETE_ARTICLE, ADD_COMMENT } from "../types";
import { normalizedArticles } from "../fixtures";
import { Record } from "immutable";
import { recordsFromArray } from "./utils";

const Article = Record({
  id: "",
  date: "",
  title: "",
  text: "",
  comments: []
});

const defaultArticles = recordsFromArray(Article, normalizedArticles);

const INITIAL_STATE = {
  articles: defaultArticles
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return state.articles.updateIn(
        [action.payload.articleId, "comments"],
        comments => comments.concat(action.randomId)
      );
    case DELETE_ARTICLE:
      return { ...state, articles: state.articles.delete(action.payload) };

    default:
      return state;
  }
};
