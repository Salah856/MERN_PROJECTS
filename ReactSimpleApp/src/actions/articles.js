import { DELETE_ARTICLE } from "../types";

export const deleteArticle = id => {
  return {
    type: DELETE_ARTICLE,
    payload: id
  };
};
