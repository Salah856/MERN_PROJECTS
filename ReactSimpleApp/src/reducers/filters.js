import { CHANGE_FILTERS } from "../types";

const INITIAL_STATE = {
  selectedArticles: [],
  from: null,
  to: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTERS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
