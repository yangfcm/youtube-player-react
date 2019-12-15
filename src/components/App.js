import React from "react";
import { Provider } from "react-redux";
import AppRouter from "../routers/AppRouter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import store from "../store";

library.add(fas);

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
