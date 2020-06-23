import { combineReducers } from "redux";
import article from "./articles";
import counter from "./counter";
import filters from "./filters";
import comments from "./comments";
export default combineReducers({
  article,
  counter,
  filters,
  comments
});
