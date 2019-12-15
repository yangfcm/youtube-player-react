import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../components/pages/Home";
import Channel from "../components/pages/Channel";
import PlayList from "../components/pages/PlayList";
import ChannelDetail from "../components/pages/ChannelDetail";
import PlaylistDetail from "../components/pages/PlayListDetail";
import Video from "../components/pages/Video";
import NotFound from "../components/pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const history = createBrowserHistory();
const AppRouter = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="flex-grow-1 mb-4">
        <Router history={history}>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/video/:id" component={Video} />
              <Route path="/channel/:id" component={ChannelDetail} />
              <Route path="/playlist/:id" component={PlaylistDetail} />
              <Route path="/channel" component={Channel} />
              <Route path="/playlist" component={PlayList} />
              <Route path="/" exact component={Home} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default AppRouter;
