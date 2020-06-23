import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import logger from "../middlewares/logger";
import randomId from "../middlewares/randomID";

const dumbMiddleware = store => next => action =>
  next({ ...action, addition: "hello world" });

const enhancer = compose(
  applyMiddleware(dumbMiddleware, logger, randomId),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, enhancer);

export default store;
