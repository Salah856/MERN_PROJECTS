import React from "react";
import Articles from "./Articles";
// import Counter from "./Counter";
import { Provider } from "react-redux";
import store from "../store";

function Root() {
  return (
    <Provider store={store}>
      <Articles />
    </Provider>
  );
}

export default Root;
