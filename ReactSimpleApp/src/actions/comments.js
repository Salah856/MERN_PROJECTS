import { ADD_COMMENT } from "../types";

export const addComment = (comment, articleId) => {
    return {
        type: ADD_COMMENT,
        payload: { ...comment, articleId },
        withRandomId: true
    };
};
