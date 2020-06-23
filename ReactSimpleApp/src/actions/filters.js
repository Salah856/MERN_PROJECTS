import { CHANGE_FILTERS } from "../types";

export const changeFilters = change => {
  return {
    type: CHANGE_FILTERS,
    payload: change
  };
};
