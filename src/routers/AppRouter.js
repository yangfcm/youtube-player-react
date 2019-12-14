import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../components/pages/Home";
import Channel from "../components/pages/Channel";
import PlayList from "../components/pages/PlayList";
import NotFound from "../components/pages/NotFound";

const history = createBrowserHistory();
const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/channel" component={Channel} />
        <Route path="/playlist" component={PlayList} />
        <Route path="/" exact component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
