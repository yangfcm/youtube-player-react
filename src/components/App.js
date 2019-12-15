import React from "react";
import AppRouter from "../routers/AppRouter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const App = () => {
  return <AppRouter />;
};

export default App;
